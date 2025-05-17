import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";
import styled from "styled-components";
import ForgotPasswordPage from "../../components/Login/ForgotPasswordPage";
import Heading from "../../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-0);
`;

export default function ForgotPassword() {
  return (
    <>
      <LoginLayout>
        <Header />
        <br />
        <ForgotPasswordPage />
      </LoginLayout>
      <Footer />
    </>
  );
}
