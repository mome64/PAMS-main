import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdBusiness, MdSchool } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import departmentService from "../../services/department.service";
import companyService from "../../services/company.service";
import studentService from "../../services/student.service";
import adminService from "../../services/admin.service";
import Spinner from "../../ui/Spinner";

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

function Dashboard() {
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

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Admin Dashboard</Heading>
      </Row>
      <DashboardContainer>
        <Box>
          <Heading as="h2">Number of Admins</Heading>
          {loadingAdmins ? (
            <Spinner />
          ) : (
            <>
              <h3>{numAdmins}</h3>
              <IconContainer>
                <MdAdminPanelSettings size={24} color="#00b494" />
              </IconContainer>
              <StyledLink>Admins</StyledLink>
            </>
          )}
        </Box>
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
              <StyledLink to="/admin/department">See detail</StyledLink>
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
          <Heading as="h2">Number of Apply Students</Heading>
          {loadingApplyStudents ? (
            <Spinner />
          ) : (
            <>
              <h3>{numApplyStudents}</h3>
              <IconContainer>
                <FaUserGraduate size={24} color="#0984e3" />
              </IconContainer>
              <StyledLink to="/admin/placement">See detail</StyledLink>
            </>
          )}
        </Box>
      </DashboardContainer>
    </>
  );
}

export default Dashboard;
