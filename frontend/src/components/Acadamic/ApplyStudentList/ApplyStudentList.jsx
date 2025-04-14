import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import studentService from "../../../services/student.service";

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (showCompany) {
      fetchData();
      // Set up interval only when showCompany is true

      const interval = setInterval(() => {
        fetchData();
      }, 1000);

      // Cleanup function to clear the interval when component unmounts or showCompany becomes false
      return () => clearInterval(interval);
    }
  }, [showCompany]);

  const fetchData = async () => {
    try {
      const response = await studentService.getAllApplyStudents();
      console.log("helllo", response.students);
      if (response) {
        setData(response.students);
      } else {
        console.error("Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h3
        style={{
          marginBottom: "10px",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        {showCompany
          ? `The system is successfully assigned all ${data.length} students in each available company.`
          : `Apply to internships for a total of ${data.length} student${
              data.length !== 1 ? "s" : ""
            }`}
      </h3>

      <Table>
        <TableHead>
          <TableRow style={{ background: "#0062", color: "black" }}>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Disability</TableHeader>
            <TableHeader>Gender</TableHeader>
            <TableHeader>GPA</TableHeader>
            <TableHeader>Preferences</TableHeader>
            {showCompany && <TableHeader>Company Name</TableHeader>}
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((item) => (
            <TableRow key={item.student_id}>
              <TableCell>{item.student_id}</TableCell>
              <TableCell>{item.name || item.student_name}</TableCell>
              <TableCell>{item.disability ? "Yes" : "No"}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.gpa}</TableCell>
              <TableCell>{item.preferences}</TableCell>
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
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// PropTypes validation
ApplyStudentList.propTypes = {
  showCompany: PropTypes.bool.isRequired,
};

export default ApplyStudentList;
