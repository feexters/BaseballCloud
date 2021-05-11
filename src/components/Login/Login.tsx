import React from "react";
import styled from "styled-components";
import bgImage from "assets/images/background-login.png";
import { SignIn } from "./components/SignIn";

const Login = () => {
  return (
    <Wrap>
      <SignIn />
    </Wrap>
  );
};

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
export default Login;
