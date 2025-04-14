import styled from "styled-components";
import {
  FaEdit,
  FaRegTrashAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const CompanyListStyledComponents = {
  TableContainer: styled.div`
    width: 100%;
    height: 400px;
    font-size: 1.6rem;
  `,
  SearchInput: styled.input`
    width: 15%;
    margin-bottom: 10px;
    margin-left: 1px;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1.4rem;
    color: var(--color-grey-900);
  `,
  ActionsWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  `,
  IconButton: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e0e0e0;
    }
  `,
  EditIcon: styled(FaEdit)`
    color: #007bff;
    font-size: 18px;
  `,
  DeleteIcon: styled(FaRegTrashAlt)`
    color: #dc3545;
    font-size: 18px;
  `,
  ConfirmationContainer: styled.div`
    position: absolute;
    top: 10px;
    left: 460px;
    background-color: #ff9966;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 15px;
    width: 400px;
  `,
  ConfirmationMessage: styled.p`
    font-size: 16px;
    color: #333333;
    margin-bottom: 20px;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: center;
    gap: 1.2rem;
  `,
  ConfirmButton: styled.button`
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
  `,
  CancelButton: styled.button`
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
  `,
  IconWrapper: styled.span`
    margin-right: 10px;
  `,
  ConfirmIcon: styled(FaCheckCircle)`
    color: #28a745;
  `,
  CancelIcon: styled(FaTimesCircle)`
    color: #dc3545;
  `,
};

export default CompanyListStyledComponents;
