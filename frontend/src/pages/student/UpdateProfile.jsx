import UpdatePassword from "../../components/student/Profile/ChnagePassword"; // Import the updated password change component
import UpdateProfile from "../../components/student/Profile/UpdateProfile";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import styled from "styled-components"; // Import styled-components for custom styling

const AccountContainer = styled.div`
  margin-top: 60px;
  background-color: var(--color-grey-100);
  padding: 50px;
`;

const UpdateSection = styled.div`
  margin-bottom: 40px;
`;

function StudentAccount() {
  return (
    <AccountContainer>
      <Heading as="h1">Update Your Account</Heading>
      <br />

      <UpdateSection>
        <Heading as="h3">Update Your Data</Heading>
        <br />
        <UpdateProfile />
      </UpdateSection>

      <UpdateSection>
        <Heading as="h3">Update Password</Heading>
        <br />
        <UpdatePassword />
      </UpdateSection>
    </AccountContainer>
  );
}

export default StudentAccount;
