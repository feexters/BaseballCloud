import { InputLogin } from "components/ui";
import {SignUpData } from "lib/interfaces";
import { Validation } from "lib/utils";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { SuccessIcon } from "assets/images/svg";

const SignIn = () => {
  const [isPlayer, setIsPlayer] = useState(true);
  const history = useHistory();

  const onValidate = ({ email, password, confirm }: SignUpData) => {
    const errors = {
      email: Validation.email(email),
      password: Validation.password(password),
      confirm: Validation.confirm(password, confirm),
    };

    if (errors.email || errors.password || errors.confirm) {
      return errors;
    } else {
      return {};
    }
  };

  const onSubmit = ({ email, password, confirm }: SignUpData) => {
    // onValidate({ email, password });
  };

  return (
    <Router>
      <Wrap>
        <RegistrationSwitch>
          {isPlayer ? (
            <>
              <SwitchButton
                isActive
                onClick={() => {
                  setIsPlayer(true);
                }}
              >
                <ButtonIcon>
                  <SuccessIcon />
                </ButtonIcon>
                Sign Up as Player
              </SwitchButton>
              <SwitchButton
                onClick={() => {
                  setIsPlayer(false);
                }}
              >
                Sign Up as Scout
              </SwitchButton>
            </>
          ) : (
            <>
              <SwitchButton
                onClick={() => {
                  setIsPlayer(true);
                }}
              >
                Sign Up as Player
              </SwitchButton>
              <SwitchButton
                isActive
                onClick={() => {
                  setIsPlayer(false);
                }}
              >
                <ButtonIcon>
                  <SuccessIcon />
                </ButtonIcon>
                Sign Up as Scout
              </SwitchButton>
            </>
          )}
        </RegistrationSwitch>
        <RegistrationInfo>
          {isPlayer ? (
            <>
              <Title>Player</Title>
              <Subtitle>
                Players have their own profile within the system and plan on
                having data collected.
              </Subtitle>
            </>
          ) : (
            <>
              <Title>Scouts</Title>
              <Subtitle>
                Coaches and scouts can view players in the system but do not
                have their own profile.
              </Subtitle>
            </>
          )}
        </RegistrationInfo>
        <Form
          onSubmit={onSubmit}
          validate={onValidate}
          initialValues={{ email: "", password: "", confirm: "" }}
          render={({ form }) => (
            <>
              <InputWrap>
                <Icon className="fas fa-user"></Icon>
                <Field
                  name="email"
                  type="email"
                  title="Email"
                  placeholder={"Email"}
                  component={InputLogin}
                />
              </InputWrap>
              <InputWrap>
                <Icon className="fas fa-lock"></Icon>
                <Field
                  name="password"
                  title="Password"
                  placeholder={"Password"}
                  type="password"
                  component={InputLogin}
                />
              </InputWrap>
              <InputWrap>
                <Icon className="fas fa-check"></Icon>
                <Field
                  name="confirm"
                  title="Confirm"
                  placeholder={"Confirm Password"}
                  type="password"
                  component={InputLogin}
                />
              </InputWrap>

              <Legal>
                By clicking Sign Up, you agree to our{" "}
                <LegalLink>Terms of Service</LegalLink> and{" "}
                <LegalLink>Privacy Policy.</LegalLink>
              </Legal>

              <ButtonSubmit onClick={form.submit}>Sign Up</ButtonSubmit>
            </>
          )}
        />

        <Footer>
          Already registered?
          <SignInLink onClick={() => history.push("/login")}>
            Sign In
          </SignInLink>
        </Footer>
      </Wrap>
    </Router>
  );
};

const Wrap = styled.div`
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

const RegistrationSwitch = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
`;

const SwitchButton = styled.button<{ isActive?: boolean }>`
  width: 100%;
  padding: 15px 5px 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isActive }) => (isActive ? "white" : "#35c32a")};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.13;
  border-radius: 0;
  border: solid 1px #35c32a;
  background-color: ${({ isActive }) => (isActive ? "#35c32a" : "white")};
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #35c32a;
  }
`;

const ButtonIcon = styled.div`
  margin-right: 5px;
`;

const RegistrationInfo = styled.div`
  background: #48bbff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Legal = styled.div`
  margin-bottom: 8px;
  margin-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 1.6rem;
  line-height: 1.42857143;
`;

const Title = styled.h1`
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 0.78;
  color: #ffffff;
  margin-bottom: 21px;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #ffffff;
  line-height: 1.44;
  font-size: 1.4rem;
`;

const Footer = styled.div`
  font-size: 16px;
  color: #667784;
  line-height: 1.42857143;
`;

const SignInLink = styled.span`
  font-size: 1.6rem;
  padding-left: 3px;
  line-height: 1.13;
  font-weight: 400;
  color: #48bbff;
  text-decoration: underline;
  cursor: pointer;
`;

const InputWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.i`
  font-size: 14px;
  color: #667784;
  position: absolute;
  top: 19px;
  left: 17px;
  bottom: 0;
`;

const ButtonSubmit = styled.button`
  width: 100%;
  padding-top: 15px;
  padding-bottom: 17px;
  font-size: 1.6rem;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-bottom: 15px;
  color: #ffffff;
  font-weight: 400;
  background-color: #48bbff;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px 0 rgb(72 187 255 / 100%);
  }
`;

const LegalLink = styled.span`
  color: #337ab7;
  text-decoration: none;
  margin-bottom: 15px;
  font-size: 16px;
  align-self: flex-end;
  cursor: pointer;

  &:hover {
    color: #23527c;
    text-decoration: underline;
  }
`;

export default SignIn;
