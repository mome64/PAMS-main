import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Heading from "./../../../ui/Heading";
import placementService from "./../../../services/placement.service";
import { useAuth } from "./../../../context/AuthContext";

// Styled component for placement result table
const PlacementResultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--color-grey-100);
`;

// Styled component for table row
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--color-grey-100);
  }
`;

// Styled component for table header cell
const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: var(--color-grey-100);
`;

// Styled component for table cell
const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const PlacementResult = () => {
  // State to hold the placement results
  const [placementResults, setPlacementResults] = useState([]);
  const { userId } = useAuth();

  // Effect to fetch placement results when the component mounts
  useEffect(() => {
    // Function to fetch placement results
    const fetchPlacementResults = async () => {
      try {
        const data =
          await placementService.getAllPlacementResultsByDepartmentId(userId);
        setPlacementResults(data);
      } catch (error) {
        console.error("Error fetching placement results:", error);
      }
    };

    // Call the function to fetch placement results
    fetchPlacementResults();
  }, [userId]);

  return (
    <>
      <Heading as="h1">Placement Results</Heading>

      <PlacementResultTable>
        <thead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Student Name</TableHeaderCell>
            <TableHeaderCell>Gender</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Company Number</TableHeaderCell>
            <TableHeaderCell>Company Email</TableHeaderCell>
            <TableHeaderCell>Assigned Company</TableHeaderCell>
          </TableRow>
        </thead>
        <tbody>
          {placementResults.map((result, index) => (
            <TableRow key={result.placement_id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {result.student_first_name} {result.student_last_name}
              </TableCell>
              <TableCell>{result.gender}</TableCell>
              <TableCell>{result.department_name}</TableCell>
              <TableCell>{result.phone_number}</TableCell>
              <TableCell>{result.contact_email}</TableCell>
              <TableCell style={{ color: "red" }}>
                {result.company_name}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </PlacementResultTable>
    </>
  );
};

export default PlacementResult;
