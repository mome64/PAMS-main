import React from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContainer = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 900px;
`;

const Modal = ({ children, onClick }) => (
  <ModalBackdrop onClick={onClick}>
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      {children}
    </ModalContainer>
  </ModalBackdrop>
);

export default Modal;
