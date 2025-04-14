import React from "react";
import styled from "styled-components";

// Styled component for the main container
const MainContainer = styled.div`
  padding: 20px;
`;

// Styled component for the section title
const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: var(--color-grey-600);
  margin-bottom: 20px;
  text-align: center; /* Center align the text */
  margin-top: 90px;

  @media screen and (min-width: 550px) {
    display: block;
  }
`;
// Styled component for the section title
const SectionTitles = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: var(--color-grey-600);
  margin-bottom: 20px;
  text-align: center; /* Center align the text */
  margin-top: 30px;

  @media screen and (min-width: 550px) {
    display: block;
  }
`;

// Styled component for the content container
const ContentContainer = styled.div`
  background-color: var(--color-grey-100);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubContainer = styled.div`
  padding: 25px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
`;

const Main = () => {
  return (
    <MainContainer>
      <SectionTitle>Welcome Placement Portal</SectionTitle>
      <ContentContainer>
        <SubContainer>
          The Placement Management System facilitates efficient management of
          student information within the university ecosystem, involving
          students, administrative staff, companies, and departments. By
          centralizing student data relevant to placements, it alleviates the
          burden of manual record-keeping and placement generation. Accessible
          across the university through secure logins tailored to each
          actor—students, administrative personnel, company representatives, and
          departmental coordinators—this system optimizes the placement process,
          enhancing collaboration and effectiveness across all stakeholders.
        </SubContainer>
      </ContentContainer>
      <SectionTitles> Why is it Essential for this System </SectionTitles>
      <ContentContainer>
        <SubContainer>
          Manual placement processes at colleges are prone to human errors due
          to extensive intervention. Placement officers are burdened with
          managing student profiles, documents, and coordinating with various
          recruiting companies. They must organize student profiles based on
          different academic streams and constantly update them to meet company
          criteria. The manual nature of this process becomes increasingly
          cumbersome with a growing student population. Implementing a Placement
          Management System significantly streamlines these tasks, offering a
          more efficient solution.
        </SubContainer>
        <SubContainer>
          A Database Management System is essential software designed for secure
          storage and retrieval of user data. Comprising a suite of programs, it
          efficiently manages databases by accepting data requests from
          applications and instructing the operating system to provide the
          requested information. Particularly in large systems, DBMS aids users
          and third-party software in seamless data storage and retrieval
          processes. Offering users the flexibility to create customized
          databases as needed, DBMS serves as a vital interface bridging data
          and software applications.
        </SubContainer>
        <SubContainer>
          Placement Management System is a web App which provides information on
          placement providers and the placements and also keeps up to date
          information of all students. It is a platform where students can view
          and assess their opportunities. The system will be having different
          types of interfaces for different type of users – Admin or Student
        </SubContainer>
      </ContentContainer>
    </MainContainer>
  );
};

export default Main;
