import React from "react";
import styled from "styled-components";
import bgImage from "assets/images/background-login.png";
import { SignIn } from "./components/SignIn";
import { ForgotPassword } from "./components/ForgotPassword";
import SignUp from "./components/SignUp/SignUp";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

const Login = () => {
  return (
    <Router>
      <Wrap>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route path="/registration">
            <SignUp />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
        </Switch>
      </Wrap>
    </Router>
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
