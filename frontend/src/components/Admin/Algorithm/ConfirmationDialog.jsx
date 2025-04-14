import styled from "styled-components";

const DialogContainer = styled.div`
  background-color: #7dc400;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 350px;
  position: absolute;
  top: 30px;
  right: 400px;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 3rem;
`;

const Button = styled.button`
  padding: 6px 13px;
  background-color: ${(props) => (props.primary ? "#007bff" : "#FF0000")};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <DialogContainer>
      <Message>{message}</Message>
      <ButtonGroup>
        <Button onClick={onConfirm} primary>
          Confirm
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonGroup>
    </DialogContainer>
  );
};

export default ConfirmationDialog;
