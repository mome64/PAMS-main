import UpdatePassword from "../../components/Admin/UpdateProfile/UpdatePassword";
import UpdateProfile from "../../components/Admin/UpdateProfile/UpdateProfile";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateProfile />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePassword />
      </Row>
    </>
  );
}

export default Account;
