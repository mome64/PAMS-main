import { useState, useEffect } from "react";
import studentService from "../../../services/student.service";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../../../context/AuthContext";
import EditStudent from "./EditStudent";
import { toast } from "react-toastify";
import Spinner from "../../../ui/Spinner";
import "react-toastify/dist/ReactToastify.css";

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
  background: var(--color-grey-100)
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

const ConfirmationContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 460px;
  background-color: #ff9966;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 400px;
`;

const ConfirmationMessage = styled.p`
  font-size: 16px;
  color: #333333;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
`;

const ConfirmButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  background-color: #e0e0e0;
  color: #333333;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #bdbdbd;
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const ConfirmIcon = styled(FaCheckCircle)`
  color: #28a745;
`;

const CancelIcon = styled(FaTimesCircle)`
  color: #dc3545;
`;

const ConfirmationDialog = ({ message, onConfirm, onCancel, show }) => {
  return (
    show && (
      <ConfirmationContainer>
        <ConfirmationMessage>{message}</ConfirmationMessage>
        <ButtonWrapper>
          <ConfirmButton onClick={onConfirm}>
            <IconWrapper>
              <ConfirmIcon />
            </IconWrapper>
            Confirm
          </ConfirmButton>
          <CancelButton onClick={onCancel}>
            <IconWrapper>
              <CancelIcon />
            </IconWrapper>
            Cancel
          </CancelButton>
        </ButtonWrapper>
      </ConfirmationContainer>
    )
  );
};

const StudentList = () => {
  const { userId } = useAuth();
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletedStudentId, setDeletedStudentId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await studentService.getStudentsByDepartment(userId);

      await new Promise((resolve) => setTimeout(resolve, 400));

      if (response.ok) {
        const responseData = await response.json();

        const studentsData = responseData.data.map((student, index) => ({
          ...student,
          id: index + 1,
        }));

        setStudents(studentsData);

        // After fetching data, set loading to false
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [userId]);

  const handleSearchTextChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
  };

  const handleDelete = (studentId) => {
    setDeletedStudentId(studentId);
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = async (studentId) => {
    try {
      const response = await studentService.deleteStudent(deletedStudentId);
      if (response.ok) {
        // Remove deleted student from the list
        setStudents(students.filter((student) => student.id !== studentId));
        toast.success("Student deleted successfully.", { autoClose: 700 });
        setTimeout(() => {
          fetchStudents();
        }, 1000);
      } else {
        console.error("Failed to delete student:", response.statusText);
        toast.error("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Error deleting student.");
    }
    setShowConfirmation(false);
  };

  const filterStudents = (student) => {
    const { first_name, last_name, contact_email, phone_number, gpa } = student;

    return (
      first_name.toLowerCase().includes(searchText) ||
      last_name.toLowerCase().includes(searchText) ||
      contact_email.toLowerCase().includes(searchText) ||
      phone_number.toLowerCase().includes(searchText) ||
      gpa.toLowerCase().includes(searchText)
    );
  };

  const filteredStudents = searchText
    ? students.filter(filterStudents)
    : students;

  const handleEdit = (studentId) => {
    setEditingStudentId(studentId);
  };

  return (
    <>
      <ConfirmationDialog
        message="Are you sure you want to delete this student?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        show={showConfirmation}
      />
      <div style={{ position: "relative" }}>
        <SearchInput
          style={{
            borderRadius: "15px",
            paddingLeft: "40px",
            width: "45%",
            maxWidth: "60%",
          }}
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search by student name, email, phone and gpa ..."
        />
        <CiSearch
          style={{
            position: "absolute",
            left: "10px",
            top: "10%",
            paddingRight: "10px",
            fontSize: "28px",
          }}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>First Name</TableHeader>
                <TableHeader>Last Name</TableHeader>
                <TableHeader>Phone Number</TableHeader>
                <TableHeader>Contact Email</TableHeader>
                <TableHeader>Gpa</TableHeader>
                <TableHeader>Department</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {filteredStudents.map((student) => (
                <TableRow key={student.student_id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.first_name}</TableCell>
                  <TableCell>{student.last_name}</TableCell>
                  <TableCell>{student.phone_number}</TableCell>
                  <TableCell>{student.contact_email}</TableCell>
                  <TableCell>{student.gpa}</TableCell>
                  <TableCell>{student.department_id}</TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <IconButton
                        onClick={() => handleEdit(student.student_id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(student.student_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ActionsWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {editingStudentId && (
        <EditStudent
          studentId={editingStudentId}
          initialData={students.find(
            (student) => student.student_id === editingStudentId
          )}
          onCancel={handleCancelDelete}
          fetchStudents={fetchStudents}
        />
      )}
    </>
  );
};

export default StudentList;
