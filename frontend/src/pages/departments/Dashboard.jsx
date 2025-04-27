import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdBusiness, MdPieChart } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { Link } from "react-router-dom";
import companyService from "../../services/company.service";
import studentService from "../../services/student.service";
import { useAuth } from "../../context/AuthContext";
import resultService from "./../../services/result.service";

// Styled components
const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

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

const IconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  svg {
    width: 24px;
    height: 24px;
    color: #0984e3;
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

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartWrapper = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 20px;
  height: 400px;
`;

// Color palette for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

function Dashboard() {
  const [numCompanies, setNumCompanies] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [numSendResults, setNumSendResults] = useState(0);
  const [chartData, setChartData] = useState([]);

  const { userId } = useAuth();

  useEffect(() => {
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

          setChartData([
            { name: "Students", value: studentData.length },
            { name: "Companies", value: companyData.companies.length },
            { name: "Results Sent", value: resultResponse.length },
          ]);
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
            <FaUserGraduate />
          </IconContainer>
          <StyledLink to="/department/student">See detail</StyledLink>
        </Box>
        <Box>
          <Heading as="h2">Number of Companies</Heading>
          <h3>{numCompanies}</h3>
          <IconContainer>
            <MdBusiness />
          </IconContainer>
          <StyledLink to="/department/companies">View Companies</StyledLink>
        </Box>
        <Box>
          <Heading as="h2">Students Who Sent Results</Heading>
          <h3>{numSendResults}</h3>
          <IconContainer>
            <MdPieChart />
          </IconContainer>
          <StyledLink to="/department/student-organizational-results">
            See detail
          </StyledLink>
        </Box>
      </DashboardContainer>

      <ChartsContainer>
        <ChartWrapper>
          <Heading as="h2" style={{ marginBottom: "1rem" }}>
            Data Distribution
          </Heading>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper>
          <Heading as="h2" style={{ marginBottom: "1rem" }}>
            Data Comparison
          </Heading>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartsContainer>
    </>
  );
}

export default Dashboard;
