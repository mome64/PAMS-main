// import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import companyService from "../../../services/company.service";
// import { FaEdit } from "react-icons/fa";
// import { FaRegTrashAlt } from "react-icons/fa";
// import styled from "styled-components";
// import EditCompany from "./EditCompany";
// import { toast } from "react-toastify";
// import Spinner from "../../../ui/Spinner";
// import "react-toastify/dist/ReactToastify.css";

// const TableContainer = styled.div`
//   width: 100%;
//   height: 400px;
//   font-size: 1.6rem;
// `;

// const SearchInput = styled.input`
//   width: 15%;
//   margin-bottom: 10px;
//   margin-left: 1px;
//   padding: 7px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 1.4rem;
//   color: var(--color-grey-900);
// `;

// const CustomDataGrid = styled(DataGrid)`
//   & .MuiDataGrid-root {
//     border-radius: 5px;
//     border: 1px solid #ccc;
//     overflow: hidden;
//   }

//   & .MuiDataGrid-columnsContainer {
//     background-color: var(--color-grey-300);
//     border-bottom: 1px solid #ccc;
//     font-weight: bold;
//   }

//   & .MuiDataGrid-columnHeader {
//     border-right: 1px solid #ccc;
//     background-color: var(--color-grey-100);
//     color: var(--color-grey-900);
//     padding: 12px;
//     font-size: 15px;
//     font-weight: 600;
//   }

//   & .MuiDataGrid-row {
//     transition: background-color 0.2s;
//     border-bottom: 1px solid #ccc;
//     color: var(--color-grey-900);
//     height: 50px;
//     font-size: 13px;
//   }
// `;

// const ActionsWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;
// `;

// const IconButton = styled.button`
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
//   padding: 5px;
//   border-radius: 50%;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #e0e0e0;
//   }
// `;

// const EditIcon = styled(FaEdit)`
//   color: #007bff;
//   font-size: 18px;
// `;

// const DeleteIcon = styled(FaRegTrashAlt)`
//   color: #dc3545;
//   font-size: 18px;
// `;

// const ConfirmationContainer = styled.div`
//   position: absolute;
//   top: 10px;
//   left: 460px;
//   background-color: #ff9966;
//   border-radius: 8px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//   padding: 15px;
//   width: 400px;
// `;

// const ConfirmationMessage = styled.p`
//   font-size: 16px;
//   color: #333333;
//   margin-bottom: 20px;
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 1.2rem;
// `;

// const ConfirmButton = styled.button`
//   background-color: #007bff;
//   color: #ffffff;
//   border: none;
//   border-radius: 4px;
//   padding: 8px 16px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const CancelButton = styled.button`
//   background-color: #e0e0e0;
//   color: #333333;
//   border: none;
//   border-radius: 4px;
//   padding: 8px 16px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #bdbdbd;
//   }
// `;

// const IconWrapper = styled.span`
//   margin-right: 10px;
// `;

// const ConfirmIcon = styled(FaCheckCircle)`
//   color: #28a745;
// `;

// const CancelIcon = styled(FaTimesCircle)`
//   color: #dc3545;
// `;

// const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
//   return (
//     <ConfirmationContainer>
//       <ConfirmationMessage>{message}</ConfirmationMessage>
//       <ButtonWrapper>
//         <ConfirmButton onClick={onConfirm}>
//           <IconWrapper>
//             <ConfirmIcon />
//           </IconWrapper>
//           Confirm
//         </ConfirmButton>
//         <CancelButton onClick={onCancel}>
//           <IconWrapper>
//             <CancelIcon />
//           </IconWrapper>
//           Cancel
//         </CancelButton>
//       </ButtonWrapper>
//     </ConfirmationContainer>
//   );
// };

// const CompanyList = () => {
//   const [companies, setCompanies] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [editingCompanyId, setEditingCompanyId] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [deletedCompanyId, setDeletedCompanyId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCompanies = async () => {
//     try {
//       const response = await companyService.getAllCompanies();

//       await new Promise((resolve) => setTimeout(resolve, 400));

//       if (response.ok) {
//         const responseData = await response.json();
//         const companiesData = responseData.companies.map((company, index) => ({
//           ...company,
//           id: index + 1,
//         }));
//         setCompanies(companiesData);

//         //After fetch data set loading is fsle
//         setLoading(false);
//       } else {
//         console.error("Failed to fetch companies:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch companies initially
//     fetchCompanies();

//     // Set up interval to fetch companies every 10 seconds
//     const intervalId = setInterval(fetchCompanies, 5000);

//     // Clean up interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleSearchTextChange = (event) => {
//     setSearchText(event.target.value);
//   };

//   const handleEdit = (companyId) => {
//     setEditingCompanyId(companyId);
//   };

//   const handleCancelEdit = () => {
//     setEditingCompanyId(null);
//   };

//   const handleDelete = (companyId) => {
//     setDeletedCompanyId(companyId);
//     setShowConfirmation(true);
//   };

//   const handleConfirmDelete = async (companyId) => {
//     try {
//       const response = await companyService.deleteCompany(deletedCompanyId);
//       if (response.ok) {
//         // Remove deleted company from the list
//         setCompanies(companies.filter((company) => company.id !== companyId));
//         toast.success("Company deleted successfully.", { autoClose: 1000 });
//       } else {
//         console.error("Failed to delete company:", response.statusText);
//         toast.error("Failed to delete company.");
//       }
//     } catch (error) {
//       console.error("Error deleting company:", error);
//       toast.error("Error deleting company.");
//     }
//     setShowConfirmation(false);
//   };

//   const handleCancelDelete = () => {
//     setShowConfirmation(false);
//   };

//   const filteredCompanies = searchText
//     ? companies.filter((company) =>
//         company.company_name.toLowerCase().includes(searchText.toLowerCase())
//       )
//     : companies;

//   const columns = [
//     { field: "id", headerName: "ID", width: 50 },
//     { field: "company_name", headerName: "Name", width: 90 },
//     { field: "phone_number", headerName: "Phone Number", width: 130 },
//     { field: "contact_email", headerName: "Contact Email", width: 160 },
//     { field: "location", headerName: "Location", width: 110 },
//     { field: "industry_sector", headerName: "Industry Sector", width: 110 },
//     {
//       field: "accepted_student_limit",
//       headerName: "Accepted Limit",
//       width: 130,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 125,
//       renderCell: (params) => (
//         <ActionsWrapper>
//           <IconButton
//             aria-label="edit"
//             onClick={() => handleEdit(params.row.company_id)}
//           >
//             <EditIcon />
//           </IconButton>
//           <IconButton
//             aria-label="delete"
//             onClick={() => handleDelete(params.row.company_id)}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </ActionsWrapper>
//       ),
//     },
//   ];

//   return (
//     <>
//       {showConfirmation && (
//         <ConfirmationDialog
//           message="Are you sure you want to delete this company?"
//           onConfirm={handleConfirmDelete}
//           onCancel={handleCancelDelete}
//         />
//       )}
//       <TableContainer>
//         <SearchInput
//           type="text"
//           value={searchText}
//           onChange={handleSearchTextChange}
//           placeholder="Search ..."
//         />
//         {loading ? (
//           <Spinner />
//         ) : (
//           <CustomDataGrid
//             rows={filteredCompanies}
//             columns={columns}
//             autoHeight
//           />
//         )}
//         {editingCompanyId && (
//           <EditCompany
//             companyId={editingCompanyId}
//             initialData={companies.find(
//               (company) => company.id === editingCompanyId
//             )}
//             onCancel={handleCancelEdit}
//           />
//         )}
//       </TableContainer>
//     </>
//   );
// };

// export default CompanyList;
