import React, { useState, useEffect } from "react";
import styled from "styled-components";
import studentService from "../../../services/student.service";
import Pagination from "../../../ui/Pagination";
import TableType from "../../../ui/TabelType";
import { useSearchParams } from "react-router-dom";

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
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await studentService.getAllApplyStudents(
        page,
        studentsPerPage
      );
      if (response) {
        setData(response.students);
        setTotalStudents(response.totalCount);
      } else {
        console.error("Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(totalStudents / studentsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
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
          ? `The system is successfully assigned all ${totalStudents} students in each available company.`
          : `Apply to internships for a total of ${totalStudents} student${
              totalStudents !== 1 ? "s" : ""
            }`}
      </h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
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
                        color: "red",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {item.company_name}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </tbody>
          </Table>

          <TableType.Footer>
            <Pagination
              count={totalStudents}
              currentPage={currentPage}
              itemsPerPage={studentsPerPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </TableType.Footer>
        </>
      )}
    </div>
  );
};

export default ApplyStudentList;
