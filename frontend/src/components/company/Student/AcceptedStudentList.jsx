import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Heading from "./../../../ui/Heading";
import placementService from "./../../../services/placement.service";
import { useAuth } from "./../../../context/AuthContext";
import SendResults from "./SendResults";
import Progress from "./Progress";
import studentService from "../../../services/student.service";

const PlacementResultsContainer = styled.div`
  margin-top: 20px;
`;

const PlacementResultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-grey-100);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--color-grey-100);
  }
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: var(--color-grey-100);
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const buttonStyle = {
  padding: "6px 25px",
  fontSize: "17px",
  borderRadius: "30px",
  margin: "10px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: "grey",
  cursor: "not-allowed",
};

const statusIconStyle = {
  marginRight: "8px",
  color: "var(--color-green-700)",
};

const pendingIconStyle = {
  marginRight: "8px",
  color: "var(--color-yellow-700)",
};

const sendIconStyle = {
  marginRight: "8px",
};

const StatusCell = styled.div`
  display: flex;
  align-items: center;
`;

const AcceptedStudentList = () => {
  const [placementResults, setPlacementResults] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentGrades, setStudentGrades] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          // Fetch placement results
          const placementData =
            await placementService.getAllPlacementResultsByCompanyId(userId);
          setPlacementResults(placementData);

          // Fetch all student grades
          const gradeResponse = await studentService.fetchGrades();
          if (gradeResponse.success) {
            setStudentGrades(gradeResponse.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, studentGrades]);

  const openProgressModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // Check if result has already been sent for a student
  const hasResultBeenSent = (studentId) => {
    const studentGrade = studentGrades.find(
      (grade) => grade.student_id === studentId
    );
    return studentGrade && studentGrade.company_result !== null;
  };

  return (
    <>
      <Heading as="h1">All Accepted Students</Heading>

      <PlacementResultsContainer>
        <PlacementResultTable>
          <thead>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Student Name</TableHeaderCell>
              <TableHeaderCell>Gender</TableHeaderCell>
              <TableHeaderCell>Disability</TableHeaderCell>
              <TableHeaderCell>Department Name</TableHeaderCell>
              <TableHeaderCell>Company Name</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Final Result</TableHeaderCell>
            </TableRow>
          </thead>
          <tbody>
            {placementResults.map((result, index) => {
              const isResultSent = hasResultBeenSent(result.student_id);
              return (
                <TableRow key={result.placement_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {result.student_first_name} {result.student_last_name}
                  </TableCell>
                  <TableCell>{result.gender}</TableCell>
                  <TableCell>
                    {result.disability === 1 ? "yes" : "no"}
                  </TableCell>
                  <TableCell>{result.department_name}</TableCell>
                  <TableCell style={{ color: "red" }}>
                    {result.company_name}
                  </TableCell>
                  <TableCell>
                    <StatusCell>
                      {isResultSent ? (
                        <>
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            style={statusIconStyle}
                          />
                          Result Sent
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon
                            icon={faClock}
                            style={pendingIconStyle}
                          />
                          Pending
                        </>
                      )}
                    </StatusCell>
                  </TableCell>
                  <TableCell>
                    <button
                      style={isResultSent ? disabledButtonStyle : buttonStyle}
                      onClick={() => {
                        if (!isResultSent) {
                          setSelectedStudentId(result.student_id);
                          setSelectedCompanyId(result.company_id);
                          setSelectedDepartmentId(result.department_id);
                        }
                      }}
                      disabled={isResultSent}
                    >
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        style={sendIconStyle}
                      />
                      {isResultSent ? "Sent" : "Send"}
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </PlacementResultTable>
        {showModal && selectedStudent && (
          <Progress
            showModal={showModal}
            setShowModal={setShowModal}
            student={selectedStudent}
          />
        )}
      </PlacementResultsContainer>

      {selectedStudentId && (
        <SendResults
          companyId={selectedCompanyId}
          studentId={selectedStudentId}
          departmentId={selectedDepartmentId}
          onClose={() => {
            setSelectedStudentId(null);
            setSelectedCompanyId(null);
            setSelectedDepartmentId(null);
          }}
          onSuccess={() => {
            // Refresh grades after sending result
            studentService.fetchGrades().then((response) => {
              if (response.success) {
                setStudentGrades(response.data);
              }
            });
          }}
        />
      )}
    </>
  );
};

export default AcceptedStudentList;
