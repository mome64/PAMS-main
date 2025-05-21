import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import companyService from "../../../services/company.service";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { toast } from "react-toastify";
import Spinner from "../../../ui/Spinner";
import { CiSearch } from "react-icons/ci";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../ui/Pagination";
import TableType from "../../../ui/TabelType";
import { useSearchParams } from "react-router-dom";
import studentService from "../../../services/student.service";
import Payment from "../../../pages/departments/Payment";
import departmentService from "../../../services/department.service";
import { useAuth } from "../../../context/AuthContext";

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

const SearchInput = styled.input`
  margin-bottom: 10px;
  margin-left: 1px;
  padding: 7px;
  border: 1px solid #ccc;
  background: var(--color-grey-100);
  font-size: 1.4rem;
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const EditIcon = styled(FaEdit)`
  color: #007bff;
  font-size: 18px;
`;

const DeleteIcon = styled(FaRegTrashAlt)`
  color: #dc3545;
  font-size: 18px;
`;

const NoStudentsMessage = styled.div`
  padding: 20px;
  text-align: center;
  background-color: var(--color-grey-100);
  border-radius: 8px;
  margin-top: 20px;
  font-size: 1.2rem;
  color: var(--color-grey-600);
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  margin: 0 10px;
  text-align: center;
`;

const StatTitle = styled.h3`
  margin-top: 0;
  color: var(--color-grey-600);
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0;
`;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [mostStudentsDept, setMostStudentsDept] = useState(null);
  const [nonStudentsCount, setNonStudentsCount] = useState(0);
  const studentsPerPage = 5;
  const DepartmentPerPage = 20;
  const { collage } = useAuth();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const response = await departmentService.getAllDepartments(
          page,
          DepartmentPerPage
        );

        await new Promise((resolve) => setTimeout(resolve, 400));

        if (response.ok) {
          const responseData = await response.json();

          const departmentsData = responseData.departments?.map(
            (department, index) => ({
              ...department,
              id: (page - 1) * DepartmentPerPage + index + 1,
            })
          );

          setDepartments(departmentsData);
        } else {
          console.error("Failed to fetch departments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, [page]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await studentService.getAllStudents(
          currentPage,
          studentsPerPage
        );

        await new Promise((resolve) => setTimeout(resolve, 400));

        if (response.ok) {
          const responseData = await response.json();

          const normalizedCollage =
            typeof collage === "string" ? collage.toLowerCase() : "";

          const studentsData = responseData.students
            ?.filter(
              (student) =>
                student?.college_name.toLowerCase() === normalizedCollage
            )
            .map((student, index) => ({
              ...student,
              id: (currentPage - 1) * studentsPerPage + index + 1,
            }));

          setStudents(studentsData);
          setTotalStudents(responseData.totalCount);
        } else {
          console.error("Failed to fetch students:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [currentPage, studentsPerPage, collage]);

  useEffect(() => {
    const fetchDepartmentStats = async () => {
      try {
        const response = await studentService.getDepartmentStats();
        if (response.ok) {
          const data = await response.json();

          if (data.departmentStats && data.departmentStats.length > 0) {
            const sorted = [...data.departmentStats].sort(
              (a, b) => b.studentCount - a.studentCount
            );
            setMostStudentsDept(sorted[0]);
          }

          setNonStudentsCount(data.nonStudentsCount || 0);
        }
      } catch (error) {
        console.error("Error fetching department stats:", error);
      }
    };

    fetchDepartmentStats();
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredStudents = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(searchText) ||
      student.last_name.toLowerCase().includes(searchText) ||
      student.contact_email.toLowerCase().includes(searchText) ||
      student.phone_number.toLowerCase().includes(searchText)
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : filteredStudents.length === 0 ? (
        <NoStudentsMessage>
          {students.length === 0
            ? "No students have registered yet."
            : "No students match your search criteria."}
        </NoStudentsMessage>
      ) : (
        <>
          <div style={{ position: "relative" }}>
            <SearchInput
              style={{
                borderRadius: "15px",
                paddingLeft: "40px",
                width: "55%",
                maxWidth: "60%",
              }}
              type="text"
              value={searchText}
              onChange={handleSearchTextChange}
              placeholder="Search by student name, email, or phone"
            />
            <CiSearch
              style={{
                position: "absolute",
                left: "10px",
                top: "10%",
                fontSize: "28px",
              }}
            />
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>First Name</TableHeader>
                <TableHeader>Last Name</TableHeader>
                <TableHeader>Phone Number</TableHeader>
                <TableHeader>Contact Email</TableHeader>
                <TableHeader>Department</TableHeader>
                <TableHeader>Payment Status</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {filteredStudents.map((student) => {
                const department = departments.find(
                  (dept) => dept.department_id === student.department_id
                );

                return (
                  <TableRow key={student.student_id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.first_name}</TableCell>
                    <TableCell>{student.last_name}</TableCell>
                    <TableCell>{student.phone_number}</TableCell>
                    <TableCell>{student.contact_email}</TableCell>
                    <TableCell>
                      {department ? department.department_name : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Payment student={student} disabled={false} />
                      <ActionsWrapper>
                        {/* Add your edit/delete buttons here */}
                      </ActionsWrapper>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default StudentList;
