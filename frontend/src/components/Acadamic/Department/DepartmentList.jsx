import { useState, useEffect } from "react";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import departmentService from "../../../services/department.service";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import EditDepartment from "./EditDepartment";
import Spinner from "../../../ui/Spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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
  background-color: #7dc400;
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

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalDepartment, setTotalDepartment] = useState(0);
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletedDepartmentId, setDeletedDepartmentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const DepartmentPerPage = 20;

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

          const data = responseData.totalCount;

          setTotalDepartment(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch departments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, [page]);

  const nextPage = () => {
    if (currentPage < Math.ceil(totalDepartment / DepartmentPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearchTextChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
  };

  const handleEdit = (departmentId) => {
    setEditingDepartmentId(departmentId);
  };

  const handleCancelEdit = () => {
    setEditingDepartmentId(null);
  };

  const handleDelete = (departmentId) => {
    setDeletedDepartmentId(departmentId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await departmentService.deleteDepartment(
        deletedDepartmentId
      );

      if (response.ok) {
        setDepartments(
          departments.filter(
            (department) => department.id !== deletedDepartmentId
          )
        );
        toast.success("Department deleted successfully.", { autoClose: 700 });
        setTimeout(async () => {
          handleUpdateDepartmentList();
        }, 1000);
      } else {
        console.error("Failed to delete department:", response.statusText);
        toast.error("Failed to delete department.");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("Error deleting department.");
    }
    setShowConfirmation(false);
  };

  const handleUpdateDepartmentList = async () => {
    try {
      const response = await departmentService.getAllDepartments(
        page,
        DepartmentPerPage
      );

      if (response.ok) {
        const responseData = await response.json();
        const updatedDepartments = responseData.departments.map(
          (department, index) => ({
            ...department,
            id: (page - 1) * DepartmentPerPage + index + 1,
          })
        );

        const data = responseData.totalCount;

        setDepartments(updatedDepartments);
        setTotalDepartment(data);
      } else {
        console.error("Failed to fetch departments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const filterDepartments = (department) => {
    const { department_name, phone_number, contact_email, office_location } =
      department;

    return (
      department_name.toLowerCase().includes(searchText) ||
      phone_number.toLowerCase().includes(searchText) ||
      contact_email.toLowerCase().includes(searchText) ||
      office_location.toLowerCase().includes(searchText)
    );
  };

  const filteredDepartments = searchText
    ? departments.filter(filterDepartments)
    : departments;

  return (
    <>
      <ConfirmationDialog
        message="Are you sure you want to delete this department?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        show={showConfirmation}
      />
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
          placeholder="Search by department name, email, phone and industry sector"
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
                <TableHeader>Department Name</TableHeader>
                <TableHeader>Phone Number</TableHeader>
                <TableHeader>Contact Email</TableHeader>
                <TableHeader>Office Location</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {filteredDepartments?.map((department) => (
                <TableRow key={department.department_id}>
                  <TableCell>{department.id}</TableCell>
                  <TableCell>{department.department_name}</TableCell>
                  <TableCell>{department.phone_number}</TableCell>
                  <TableCell>{department.contact_email}</TableCell>
                  <TableCell>{department.office_location}</TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <IconButton
                        onClick={() => handleEdit(department.department_id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(department.department_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ActionsWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <TableType.Footer>
            <Pagination
              count={totalDepartment}
              currentPage={currentPage}
              itemsPerPage={DepartmentPerPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </TableType.Footer>
        </>
      )}
      {editingDepartmentId && (
        <EditDepartment
          departmentId={editingDepartmentId}
          initialData={departments.find(
            (department) => department.department_id === editingDepartmentId
          )}
          onCancel={handleCancelEdit}
          onDepartmentUpdated={handleUpdateDepartmentList}
        />
      )}
    </>
  );
};

export default DepartmentList;
