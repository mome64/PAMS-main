import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdBusiness, MdSchool, MdAdminPanelSettings } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import departmentService from "../../services/department.service";
import companyService from "../../services/company.service";
import studentService from "../../services/student.service";
import adminService from "../../services/acadamic.service";
import Spinner from "../../ui/Spinner";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useAuth } from "../../context/AuthContext";

const COLORS = ["#0984e3", "#00cec9", "#fd79a8", "#e17055", "#6c5ce7"];

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30.33%, 1fr));
  gap: 4rem;
`;

const Box = styled.div`
  position: relative;
  padding: 20px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  color: white;

  &:hover {
    transform: translateY(-1px);
  }

  h2 {
    font-size: 1.6rem;
    margin-bottom: 10px;
    color: var(--color-grey-600);
  }

  h3 {
    font-size: 2.7rem;
    margin-bottom: 30px;
    color: var(--color-grey-600);
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledLink = styled(Link)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #0984e3;
  text-decoration: none;
  font-weight: bold;
`;

const ChartGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
`;

const ChartBox = styled(Box)`
  flex: 1 1 calc(50% - 2rem);
`;

function Dashboard() {
  const { userId, userRole } = useAuth();
  console.log(userId, userRole);

  const [numDepartments, setNumDepartments] = useState(0);
  const [numCompanies, setNumCompanies] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [numAdmins, setNumAdmins] = useState(0);
  const [numApplyStudents, setNumApplyStudents] = useState([]);

  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [loadingApplyStudents, setLoadingApplyStudents] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const departmentResponse = await departmentService.getAllDepartments();
      const companyResponse =
        await companyService.getAllCompaniesWithoutPagination();
      const studentResponse = await studentService.getAllStudents();
      const adminResponse = await adminService.getAllAdmins();
      const applyStudentResponse = await studentService.getAllApplyStudents();

      await new Promise((resolve) => setTimeout(resolve, 400));

      if (
        departmentResponse.ok &&
        companyResponse.ok &&
        studentResponse.ok &&
        adminResponse.ok &&
        applyStudentResponse
      ) {
        const departmentData = await departmentResponse.json();
        const companyData = await companyResponse.json();
        const studentData = await studentResponse.json();
        const adminData = await adminResponse.json();

        setNumDepartments(departmentData.totalCount);
        setNumCompanies(companyData.companies.length);
        setNumStudents(studentData.students.length);
        setNumAdmins(adminData.admins.length);
        setNumApplyStudents(applyStudentResponse.students.length);
      } else {
        console.error("Failed to fetch dashboard data");
      }

      setLoadingDepartments(false);
      setLoadingCompanies(false);
      setLoadingStudents(false);
      setLoadingAdmins(false);
      setLoadingApplyStudents(false);
    }

    fetchData();
  }, []);

  const chartData = [
    { name: "Departments", value: numDepartments },
    { name: "Companies", value: numCompanies },
    { name: "Students", value: numStudents },
    { name: "Applied", value: numApplyStudents },
  ];

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Collage Dashboard</Heading>
      </Row>

      <DashboardContainer>
        <Box>
          <Heading as="h2">Number of Departments</Heading>
          {loadingDepartments ? (
            <Spinner />
          ) : (
            <>
              <h3>{numDepartments}</h3>
              <IconContainer>
                <MdSchool size={24} color="#00b894" />
              </IconContainer>
              <StyledLink to="/acadamic/department">See detail</StyledLink>
            </>
          )}
        </Box>

        <Box>
          <Heading as="h2">Number of Companies</Heading>
          {loadingCompanies ? (
            <Spinner />
          ) : (
            <>
              <h3>{numCompanies}</h3>
              <IconContainer>
                <MdBusiness size={24} color="#0984e3" />
              </IconContainer>
            </>
          )}
        </Box>

        <Box>
          <Heading as="h2">Number of Students</Heading>
          {loadingStudents ? (
            <Spinner />
          ) : (
            <>
              <h3>{numStudents}</h3>
              <IconContainer>
                <FaUserGraduate size={24} color="#0984e3" />
              </IconContainer>
              <StyledLink>Students</StyledLink>
            </>
          )}
        </Box>

        <Box>
          <Heading as="h2">Applied Students</Heading>
          {loadingApplyStudents ? (
            <Spinner />
          ) : (
            <>
              <h3>{numApplyStudents}</h3>
              <IconContainer>
                <FaUserGraduate size={24} color="#0984e3" />
              </IconContainer>
              <StyledLink to="/acadamic/placement">See detail</StyledLink>
            </>
          )}
        </Box>
      </DashboardContainer>

      {/* Charts Section */}
      <ChartGrid>
        <ChartBox>
          <Heading as="h2">Bar Chart Overview</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0984e3" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox>
          <Heading as="h2">Pie Chart Distribution</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((_, index) => (
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
        </ChartBox>

        <ChartBox>
          <Heading as="h2">Line Chart Trends</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#00cec9" />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox>
          <Heading as="h2">Radar Chart Comparison</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar
                name="Stats"
                dataKey="value"
                stroke="#e17055"
                fill="#e17055"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartGrid>
    </>
  );
}

export default Dashboard;
