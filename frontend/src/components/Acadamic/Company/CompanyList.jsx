import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import companyService from "../../../services/company.service";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import EditCompany from "./EditCompany";
import { toast } from "react-toastify";
import Spinner from "../../../ui/Spinner";
import { CiSearch } from "react-icons/ci";
import "react-toastify/dist/ReactToastify.css";
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
  display: ${({ show }) =>
    show ? "block" : "none"}; // Conditionally render based on 'show' prop
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
      <ConfirmationContainer show={show}>
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

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [totalcompanies, setTotalCompanies] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletedCompanyId, setDeletedCompanyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const companiesPerPage = 5;

  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await companyService.getAllCompanies(
          page,
          companiesPerPage
        );

        await new Promise((resolve) => setTimeout(resolve, 400));

        if (response.ok) {
          const responseData = await response.json();
          const companiesData = responseData.companies.map(
            (company, index) => ({
              ...company,
              id: (page - 1) * companiesPerPage + index + 1,
            })
          );

          const data = responseData.totalCount;

          setCompanies(companiesData);
          setTotalCompanies(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch companies:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, [page]);

  const nextPage = () => {
    if (currentPage < Math.ceil(totalcompanies / totalcompanies)) {
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

  const handleEdit = (companyId) => {
    setEditingCompanyId(companyId);
  };

  const handleCancelEdit = () => {
    setEditingCompanyId(null);
  };

  const handleDelete = (companyId) => {
    setDeletedCompanyId(companyId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await companyService.deleteCompany(deletedCompanyId);

      if (response.ok) {
        setCompanies(
          companies.filter((company) => company.id !== deletedCompanyId)
        );
        toast.success("Company deleted successfully.", { autoClose: 700 });
        setTimeout(async () => {
          handleUpdateCompanyList();
        }, 1000);
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

  const handleUpdateCompanyList = async () => {
    try {
      const response = await companyService.getAllCompanies(
        page,
        companiesPerPage
      );

      if (response.ok) {
        const responseData = await response.json();
        const companiesData = responseData.companies.map((company, index) => ({
          ...company,
          id: (page - 1) * companiesPerPage + index + 1,
        }));

        const data = responseData.totalCount;

        setCompanies(companiesData);
        setTotalCompanies(data);
      } else {
        console.error("Failed to fetch companies:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  return (
    <>
      <ConfirmationDialog
        message="Are you sure you want to delete this company?"
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
          placeholder="Search by company name, email, phone and industry sector"
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
                <TableHeader>Company Name</TableHeader>
                <TableHeader>Phone Number</TableHeader>
                <TableHeader>Contact Email</TableHeader>
                <TableHeader>Location</TableHeader>
                <TableHeader>Industry Sector</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {companies.map((company) => (
                <TableRow key={company.company_id}>
                  <TableCell>{company.id}</TableCell>
                  <TableCell>{company.company_name}</TableCell>
                  <TableCell>{company.phone_number}</TableCell>
                  <TableCell>{company.contact_email}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>{company.industry_sector}</TableCell>
                  <TableCell>
                    <ActionsWrapper>
                      <IconButton
                        onClick={() => handleEdit(company.company_id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(company.company_id)}
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
              count={totalcompanies}
              currentPage={currentPage}
              itemsPerPage={companiesPerPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </TableType.Footer>
        </>
      )}
      {editingCompanyId && (
        <>
          <EditCompany
            companyId={editingCompanyId}
            initialData={companies.find(
              (company) => company.company_id === editingCompanyId
            )}
            onCancel={handleCancelEdit}
            onCompanyUpdated={handleUpdateCompanyList}
          />
        </>
      )}
    </>
  );
};

export default CompanyList;
