import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdBusiness } from "react-icons/md"; // Import organization icon
import { FaUserGraduate } from "react-icons/fa"; // Import student icon
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { Link } from "react-router-dom";
import companyService from "../../services/company.service";
import studentService from "../../services/student.service";
import { useAuth } from "../../context/AuthContext";
import resultService from "./../../services/result.service";

// Styled component for the dashboard container
const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

// Styled component for the individual box
const Box = styled.div`
  position: relative;
  padding: 20px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  cursor: pointer;
  color: var(--color-grey-600);

  &:hover {
    transform: translateY(-1px);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
  p {
    font-size: 1.2rem;
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #0984e3;
  text-decoration: none;
  font-weight: bold;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

function Dashboard() {
  const [numCompanies, setNumCompanies] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [numSendResults, setNumSendResults] = useState(0);

  const { userId } = useAuth();

  useEffect(() => {
    // Fetch real data for the dashboard
    async function fetchData() {
      try {
        const companyResponse =
          await companyService.getAllCompaniesWithoutPagination();
        const studentResponse = await studentService.getStudentsByDepartment(
          userId
        );

        const resultResponse = await resultService.getResultsByDepartmentId(
          userId
        );

        if (companyResponse.ok && studentResponse.ok) {
          const companyData = await companyResponse.json();
          const studentData = await studentResponse.json();

          setNumCompanies(companyData.companies.length);
          setNumStudents(studentData.length);
          setNumSendResults(resultResponse.length);
        } else {
          console.error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Department Dashboard</Heading>
      </Row>

      <DashboardContainer>
        <Box>
          <Heading as="h2">Number of Students</Heading>
          <h3>{numStudents}</h3>
          <IconContainer>
            <FaUserGraduate size={24} color="#0984e3" />{" "}
          </IconContainer>
          <StyledLink to="/department/student">See detail</StyledLink>
        </Box>
        <Box>
          <Heading as="h2">Number of Companies</Heading>
          <h3>{numCompanies}</h3>
          <IconContainer>
            <MdBusiness size={24} color="#0984e3" />{" "}
          </IconContainer>
          <StyledLink>Numbers of companys</StyledLink>
        </Box>
        <Box>
          <Heading as="h2">Number Of Students Who Sent Results</Heading>
          <h3>{numSendResults}</h3>
          <IconContainer>
            <MdBusiness size={24} color="#0984e3" />{" "}
          </IconContainer>
          <StyledLink to="/department/student-organizational-results">
            See detail
          </StyledLink>
        </Box>
      </DashboardContainer>
    </>
  );
}

export default Dashboard;
