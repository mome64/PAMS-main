import styled from "styled-components";
import Header from "../../components/Home/Header";
import Main from "../../components/Home/Home";
import Footer from "../../components/Home/Footer";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto; /* Header, Main, Footer */
  min-height: 100vh;
  background-color: var(--color-grey-50);
`;

const Home = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Main />
      <Footer />
    </StyledAppLayout>
  );
};

export default Home;
