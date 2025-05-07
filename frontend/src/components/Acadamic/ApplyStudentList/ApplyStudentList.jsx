import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import studentService from "../../../services/student.service";
import departmentService from "../../../services/department.service";
import { useAuth } from "../../../context/AuthContext";

// Styled Components
const PrintButton = styled.button`
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#2e7d32")};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: var(--color-grey-200);
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--color-grey-100);
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const ApplyStudentList = ({ showCompany }) => {
  const [data, setData] = useState([]);
  const printRef = useRef();
  const [departments, setDepartments] = useState([]);
  const { collage } = useAuth();
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (showCompany) {
      fetchData();
      const interval = setInterval(() => {
        fetchData();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showCompany]);
  const DepartmentPerPage = 20;
  const page = 1;
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentService.getAllDepartments(
          page,
          DepartmentPerPage
        );

        await new Promise((resolve) => setTimeout(resolve, 400));

        if (response.ok) {
          const responseData = await response.json();

          const departmentsData = responseData.departments
            ?.filter(
              (department) =>
                department?.college_name.toLowerCase() === collage.toLowerCase()
            )
            .map((department, index) => ({
              ...department,
              id: (page - 1) * DepartmentPerPage + index + 1,
            }));

          setDepartments(departmentsData);
        } else {
          console.error("Failed to fetch departments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await studentService.getAllApplyStudents();
      console.log(response);
      if (response?.students) {
        const filteredStudents = response.students?.filter(
          (student) => student.college_name.toLowerCase() === collage.toLowerCase()
        );
        setData(filteredStudents);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrint = () => {
    if (!showCompany) {
      alert(
        "Printing is only allowed after generating companies for students."
      );
      return;
    }

    const printContent = printRef.current;
    const printWindow = window.open("", "", "width=1000,height=800");

    printWindow.document.write(`
      <html>
        <head>
          <title>Student List</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
            }
            th {
              background-color: #0062;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            h3 {
              margin-bottom: 20px;
              padding: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              border-radius: 10px;
            }
            .no-print {
              display: none !important;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div>
      <PrintButton onClick={handlePrint} disabled={!showCompany}>
        Print PDF
      </PrintButton>

      <div ref={printRef}>
        <h3>
          {showCompany
            ? `The system is successfully assigned all ${data.length} students in each available company.`
            : `Apply to internships for a total of ${data.length} student${
                data.length !== 1 ? "s" : ""
              }`}
        </h3>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>

              <TableHeader>Gender</TableHeader>
              <TableHeader>GPA</TableHeader>
              <TableHeader>Department</TableHeader>
              <TableHeader className="no-print">Preferences</TableHeader>
              {showCompany && <TableHeader>Company Name</TableHeader>}
            </TableRow>
          </TableHead>
          <tbody>
            {data.map((item) => {
              const matchedDepartment = departments.find(
                (dep) => dep.department_id === item.department_id
              );

              return (
                <TableRow key={item.student_id}>
                  <TableCell>{item.student_id}</TableCell>
                  <TableCell>{item.name || item.student_name}</TableCell>

                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.gpa}</TableCell>

                  <TableCell>
                    {matchedDepartment
                      ? matchedDepartment.department_name
                      : "—"}
                  </TableCell>

                  <TableCell className="no-print">{item.preferences}</TableCell>

                  {showCompany && (
                    <TableCell
                      style={{
                        color: "#456fff",
                        textTransform: "uppercase",
                        fontWeight: "700",
                        margin: "-10px",
                        background: "#FFFAA9",
                      }}
                    >
                      {item.company_name}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

ApplyStudentList.propTypes = {
  showCompany: PropTypes.bool.isRequired,
};

export default ApplyStudentList;
