import React from "react";
import Header from "../../components/student/Header/Header";
import styled from "styled-components";
import UserProfile from "../../components/student/Profile/Profile";

const StudentLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  grid-template-columns: 1fr;
  align-content: center;
  justify-content: center;
  padding: 30px;
  gap: 3.2rem;
  background-color: var(--color-grey-200);
`;

const Dashboard = () => {
  return (
    <>
      <StudentLayout>
        <Header />
        <UserProfile />
      </StudentLayout>
    </>
  );
};

export default Dashboard;
