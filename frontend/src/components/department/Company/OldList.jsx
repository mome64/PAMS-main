import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import companyService from "../../../services/company.service";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import EditCompany from "./EditCompany";
import { toast } from "react-toastify";
import Spinner from "../../../ui/Spinner";
import "react-toastify/dist/ReactToastify.css";

const TableContainer = styled.div`
  width: 100%;
  height: 400px;
  font-size: 1.6rem;
`;

const SearchInput = styled.input`
  width: 15%;
  margin-bottom: 10px;
  margin-left: 1px;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.4rem;
  color: var(--color-grey-900);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
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

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
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
  );
};

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletedCompanyId, setDeletedCompanyId] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentPage = 5;

  const fetchCompanies = async (page, size) => {
    try {
      const response = await companyService.getAllCompanies(page, size);

      await new Promise((resolve) => setTimeout(resolve, 400));

      if (response.ok) {
        const responseData = await response.json();
        const companiesData = responseData.companies.map((company, index) => ({
          ...company,
          id: index + 1,
        }));
        setCompanies(companiesData);

        //After fetch data set loading is false
        setLoading(false);
      } else {
        console.error("Failed to fetch companies:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    // Fetch companies initially
    fetchCompanies(currentPage, companiesPerPage);

    // Set up interval to fetch companies every 10 seconds
    const intervalId = setInterval(
      () => fetchCompanies(currentPage, companiesPerPage),
      5000
    );

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentPage, companiesPerPage]);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleEdit = (companyId) => {
    setEditingCompanyId(companyId);
  };

  const handleCancelEdit = () => {
    setEditingCompanyId(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchCompanies(pageNumber, companiesPerPage);
  };

  const handleDelete = (companyId) => {
    setDeletedCompanyId(companyId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async (companyId) => {
    try {
      const response = await companyService.deleteCompany(companyId);
      if (response.ok) {
        // Remove deleted company from the list
        setCompanies(companies.filter((company) => company.id !== companyId));
        toast.success("Company deleted successfully.", { autoClose: 1000 });
      } else {
        console.error("Failed to delete company:", response.statusText);
        toast.error("Failed to delete company.");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("Error deleting company.");
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const filteredCompanies = searchText
    ? companies.filter((company) =>
        company.company_name.toLowerCase().includes(searchText.toLowerCase())
      )
    : companies;

  console.log("hhhhhhhhhhh", companies, "hhhhhhhhhhhh", filteredCompanies);

  return (
    <>
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete this company?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <TableContainer>
        <SearchInput
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search ..."
        />
        {loading ? (
          <Spinner />
        ) : (
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Phone Number</TableHeader>
                <TableHeader>Contact Email</TableHeader>
                <TableHeader>Location</TableHeader>
                <TableHeader>Industry Sector</TableHeader>
                <TableHeader>Accepted Limit</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.id}</TableCell>
                  <TableCell>{company.company_name}</TableCell>
                  <TableCell>{company.phone_number}</TableCell>
                  <TableCell>{company.contact_email}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>{company.industry_sector}</TableCell>
                  <TableCell>{company.accepted_student_limit}</TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <IconButton onClick={() => handleEdit(company.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(company.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ActionsWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
        {editingCompanyId && (
          <EditCompany
            companyId={editingCompanyId}
            initialData={companies.find(
              (company) => company.id === editingCompanyId
            )}
            onCancel={() => setEditingCompanyId(null)}
          />
        )}
      </TableContainer>
    </>
  );
};

export default CompanyList;
