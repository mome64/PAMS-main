import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdBusiness } from "react-icons/md"; // Organization icon
import { FaUserGraduate } from "react-icons/fa"; // Student icon
import { useAuth } from "../../context/AuthContext";
import companyService from "../../services/company.service"; // Example service to get company data
import studentService from "../../services/student.service"; // Example service to get student data

// Styled component for the dashboard container
const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 20px;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem;
  }
`;

// Styled link for navigating to more details
const StyledLink = styled.a`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #0984e3;
  text-decoration: none;
  font-weight: bold;
`;

// Container for icons at the top-right corner of each box
const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
`;

function CompanyDashboard() {
  const [numCompanies, setNumCompanies] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [numResults, setNumResults] = useState(0);

  const { userId } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch real data for the dashboard
        const companyResponse = await companyService.getAllCompanies();
        const studentResponse = await studentService.getStudentsByDepartment(
          userId
        );

        if (companyResponse.ok && studentResponse.ok) {
          const companyData = await companyResponse.json();
          const studentData = await studentResponse.json();

          setNumCompanies(companyData.companies.length);
          setNumStudents(studentData.length);
          setNumResults(companyData.results.length); // Example to handle result data
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
    <div>
      <h1>Company Dashboard</h1>

      <DashboardContainer>
        <Box>
          <h2>Number of Students</h2>
          <h3>{numStudents}</h3>
          <IconContainer>
            <FaUserGraduate color="#0984e3" />
          </IconContainer>
          <StyledLink href="/students">See Details</StyledLink>
        </Box>

        <Box>
          <h2>Number of Companies</h2>
          <h3>{numCompanies}</h3>
          <IconContainer>
            <MdBusiness color="#0984e3" />
          </IconContainer>
          <StyledLink href="/companies">See Details</StyledLink>
        </Box>

        <Box>
          <h2>Results Submitted</h2>
          <h3>{numResults}</h3>
          <IconContainer>
            <MdBusiness color="#0984e3" />
          </IconContainer>
          <StyledLink href="/results">See Details</StyledLink>
        </Box>
      </DashboardContainer>
    </div>
  );
}

export default CompanyDashboard;
