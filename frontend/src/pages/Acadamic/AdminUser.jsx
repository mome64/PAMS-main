import SignupForm from "../../components/Acadamic/AdminUser/User";
import Heading from "../../ui/Heading";

function AdminUser() {
  return (
    <>
      <Heading as="h1">Create a new Admin</Heading>
      <SignupForm />
    </>
  );
}

export default AdminUser;
