import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  height: 10vh;
  background-color: var(--color-grey-150);
  padding: 5px;
  font-weight: 500;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p
        style={{
          textAlign: "center",
          margin: "10px 0 0",
          fontSize: "14px",
          padding: "5px 10px",
        }}
      >
        &copy; {new Date().getFullYear()} Haramaya University. Developed by our
        group members. All rights reserved.
      </p>
    </FooterContainer>
  );
};

export default Footer;
