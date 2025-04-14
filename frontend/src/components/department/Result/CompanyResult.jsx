import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "./../../../ui/Heading";
import { useAuth } from "./../../../context/AuthContext";
import resultService from "../../../services/result.service";
import SeeResultDetail from "./ResultDetail";

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
};

const CompanyResult = () => {
  const [placementResults, setPlacementResults] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchPlacementResults = async () => {
      try {
        if (userId) {
          const data = await resultService.getResultsByDepartmentId(userId);
          setPlacementResults(data);
        }
      } catch (error) {
        console.error("Error fetching placement results:", error);
      }
    };

    fetchPlacementResults();
  }, [userId]);

  return (
    <>
      <Heading as="h1">All Accepted Students</Heading>

      <PlacementResultsContainer>
        <PlacementResultTable>
          <thead>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Student Name</TableHeaderCell>
              <TableHeaderCell>Advisor Name</TableHeaderCell>
              <TableHeaderCell>Company Name</TableHeaderCell>
              <TableHeaderCell>Total (40%)</TableHeaderCell>
              <TableHeaderCell>See Detail</TableHeaderCell>
            </TableRow>
          </thead>
          <tbody>
            {placementResults.map((result, index) => (
              <TableRow key={result.placement_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {result.student_first_name} {result.student_last_name}
                </TableCell>
                <TableCell>{result.advisor_name}</TableCell>
                <TableCell>{result.company_name}</TableCell>
                <TableCell>
                  {parseFloat(result.commitment) +
                    parseFloat(result.courtesy) +
                    parseFloat(result.conduct) +
                    parseFloat(result.perseverance) +
                    parseFloat(result.teamwork) +
                    parseFloat(result.professional_ethics) +
                    parseFloat(result.creativity) +
                    parseFloat(result.technical_knowledge) +
                    parseFloat(result.efficiency) +
                    parseFloat(result.professional_comments) +
                    parseFloat(result.attendance)}
                </TableCell>

                <TableCell>
                  <button
                    style={buttonStyle}
                    onClick={() => {
                      setSelectedStudentId(result.student_id);
                    }}
                  >
                    Detail
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </PlacementResultTable>
      </PlacementResultsContainer>

      {selectedStudentId && (
        <SeeResultDetail
          studentId={selectedStudentId}
          onClose={() => {
            setSelectedStudentId(null);
          }}
        />
      )}
    </>
  );
};

export default CompanyResult;
