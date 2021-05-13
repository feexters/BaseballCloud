import React from "react";
import styled from "styled-components";
import bgImage from "assets/images/background-login.png";

const LoginLayout: React.FC = ({ children }) => {
  return (
    <Wrap>
      <LoginWindow>{children}</LoginWindow>
    </Wrap>
  );
};

const LoginWindow = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 16px;
  background: hsla(0, 0%, 100%, 0.8);
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  backdrop-filter: blur(5px);
`;

const Wrap = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: top center;
  background-image: url(${bgImage});
  background-size: cover;
`;

export default LoginLayout;
