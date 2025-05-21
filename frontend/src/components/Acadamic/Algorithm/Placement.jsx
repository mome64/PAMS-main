import { useState, useEffect } from "react";
import styled from "styled-components";
import studentService from "../../../services/student.service";
import placementService from "../../../services/placement.service";
import companyService from "../../../services/company.service";
import ApplyStudentList from "../ApplyStudentList/ApplyStudentList";
import ConfirmationDialog from "./ConfirmationDialog";

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) =>
    props.primary === "true" ? "#7dc400" : "red"};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-right: ${(props) => (props.marginRight ? "30px" : "0")};
`;

const StudentPlacement = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [placementGenerated, setPlacementGenerated] = useState(() => {
    const storedPlacementStatus = localStorage.getItem("placementGenerated");
    return storedPlacementStatus ? JSON.parse(storedPlacementStatus) : false;
  });

  const [showCompany, setShowCompany] = useState(() => {
    const storedShowCompanyStatus = localStorage.getItem("showCompany");
    return storedShowCompanyStatus
      ? JSON.parse(storedShowCompanyStatus)
      : false;
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "placementGenerated",
      JSON.stringify(placementGenerated)
    );
    localStorage.setItem("showCompany", JSON.stringify(showCompany));
  }, [placementGenerated, showCompany]);

  useEffect(() => {
    const storedPlacementStatus = localStorage.getItem("placementGenerated");
    if (storedPlacementStatus) {
      setPlacementGenerated(JSON.parse(storedPlacementStatus));
      setShowCompany(JSON.parse(storedPlacementStatus));
    }

    const storedShowCompanyStatus = localStorage.getItem("showCompany");
    if (storedShowCompanyStatus) {
      setShowCompany(JSON.parse(storedShowCompanyStatus));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await companyService.getAllCompaniesWithoutPagination();

        if (response.ok) {
          const data = await response.json();
          setCompaniesData(data.companies || []);
        } else {
          console.error("Failed to fetch company data");
          setCompaniesData([]);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        setCompaniesData([]);
      }
    };

    fetchData();
  }, []);

  async function assignStudentsToCompanies() {
    try {
      // Initialize data structures
      const companyMap = new Map(
        companiesData.map((company) => [company.company_id, company])
      );
      const assignments = new Map(
        companiesData.map((company) => [
          company.company_id,
          { company, students: [] },
        ])
      );
      const unassignedStudents = [];

      // Get all students and sort by GPA (higher first) then application time (earlier first)
      const studentsResponse = await studentService.getAllApplyStudents();
      if (!studentsResponse?.status || !studentsResponse.students) {
        console.error("Failed to fetch student data");
        return;
      }

      const allStudents = studentsResponse.students
        .filter((student) => student?.preferences)
        .sort((a, b) => {
          // First sort by GPA (descending)
          if (b.gpa !== a.gpa) {
            return b.gpa - a.gpa;
          }
          // Then by application time (ascending)
          return new Date(a.created_time) - new Date(b.created_time);
        });

      // Process each student's preferences
      allStudents.forEach((student) => {
        try {
          const prefs = student.preferences
            .split(",")
            .map(Number)
            .filter(Boolean);
          if (prefs.length === 0) {
            unassignedStudents.push(student);
            return;
          }

          // Find the highest priority company with available spots
          for (const companyId of prefs) {
            const companyAssignment = assignments.get(companyId);
            if (!companyAssignment) continue;

            const company = companyMap.get(companyId);
            if (!company) continue;

            if (
              companyAssignment.students.length < company.accepted_student_limit
            ) {
              companyAssignment.students.push(student);
              return; // Student assigned, move to next student
            }
          }

          // If we get here, student couldn't be assigned to any preference
          unassignedStudents.push(student);
        } catch (error) {
          console.error(
            `Error processing student ${student.student_id}:`,
            error
          );
          unassignedStudents.push(student);
        }
      });

      // Now handle cases where students compete for the same spots
      // We need to prioritize based on GPA, then preference order, then application time
      assignments.forEach((assignment) => {
        if (
          assignment.students.length <=
          assignment.company.accepted_student_limit
        ) {
          return; // No competition for spots
        }

        // Sort students by:
        // 1. GPA (higher first)
        // 2. Their preference priority for this company (lower index = higher priority)
        // 3. Application time (earlier = higher priority)
        assignment.students.sort((a, b) => {
          // First by GPA (descending)
          if (b.gpa !== a.gpa) {
            return b.gpa - a.gpa;
          }

          // Then by preference index (lower = better)
          const aPrefIndex = a.preferences
            .split(",")
            .map(Number)
            .indexOf(assignment.company.company_id);
          const bPrefIndex = b.preferences
            .split(",")
            .map(Number)
            .indexOf(assignment.company.company_id);
          if (aPrefIndex !== bPrefIndex) {
            return aPrefIndex - bPrefIndex;
          }

          // Finally by application time (earlier = better)
          return new Date(a.created_time) - new Date(b.created_time);
        });

        // Trim to accepted student limit
        assignment.students = assignment.students.slice(
          0,
          assignment.company.accepted_student_limit
        );
      });

      // Handle unassigned students (try to assign to any company with remaining spots)
      unassignedStudents.forEach((student) => {
        for (const [companyId, assignment] of assignments) {
          if (
            assignment.students.length <
            assignment.company.accepted_student_limit
          ) {
            // Check if student included this company in their preferences
            try {
              const prefs = student.preferences.split(",").map(Number);
              if (prefs.includes(companyId)) {
                assignment.students.push(student);
                return; // Student assigned, move to next
              }
            } catch (error) {
              console.error(
                `Error processing unassigned student ${student.student_id}:`,
                error
              );
            }
          }
        }
      });

      // Prepare final results
      const flattenedResults = [];
      assignments.forEach((assignment) => {
        assignment.students.forEach((student) => {
          flattenedResults.push({
            student_id: student.student_id,
            company_id: assignment.company.company_id,
          });
        });
      });

      await placementService.sendPlacementResults(flattenedResults);
      console.log("Placement generation completed successfully");
    } catch (error) {
      console.error("Error in assignStudentsToCompanies:", error);
    }
  }

  const handleResetPlacement = async () => {
    try {
      const response = await studentService.deleteAllPlacementResults();
      if (response) {
        console.log("Placement results reset successfully.");
        localStorage.setItem("placementGenerated", "false");
        setPlacementGenerated(false);
        setShowCompany(false);
      } else {
        console.error("Failed to reset placement results");
      }
    } catch (error) {
      console.error("Error resetting placement results:", error);
    }
    setShowConfirmation(false);
  };

  return (
    <div>
      {!placementGenerated ? (
        <Button
          primary={placementGenerated ? "false" : "true"}
          onClick={() => {
            console.log("Generating placement...");
            assignStudentsToCompanies();
            setPlacementGenerated(true);
            setShowCompany(true);
          }}
        >
          Generate placement
        </Button>
      ) : (
        <>
          <Button primary="false" onClick={() => setShowConfirmation(true)}>
            Reset placement
          </Button>

          {showConfirmation && (
            <ConfirmationDialog
              message="Are you sure you want to reset placement?."
              onConfirm={handleResetPlacement}
              onCancel={() => setShowConfirmation(false)}
            />
          )}
        </>
      )}
      <ApplyStudentList
        showCompany={showCompany}
        companiesData={companiesData}
      />
    </div>
  );
};

export default StudentPlacement;
