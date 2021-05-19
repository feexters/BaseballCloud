import { InputLogin } from "ui";
import { SignInData } from "lib/interfaces";
import React, { useEffect } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { authSingIn } from "store";
import { finishAuthSubmitting } from "store/slices";
import { LoginLayout } from "layouts";
import { ROUTE_FORGOTPASSWORD, ROUTE_REGISTRATION } from "lib/const/routes";

const SignIn = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { submit } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(finishAuthSubmitting(""));
  }, [dispatch]);

  const onSubmit = ({ email, password }: SignInData) => {
    dispatch(authSingIn({ email, password }));
  };

  return (
    <LoginLayout>
      <Title>Welcome to BaseballCloud!</Title>
      <Subtitle>Sign into your account here:</Subtitle>
      <Form
        onSubmit={onSubmit}
        initialValues={{ email: "", password: "" }}
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

            {submit.result && (
              <ErrorValidation>{submit.result}</ErrorValidation>
            )}
            <ButtonSubmit
              isSubmitting={submit.status}
              onClick={form.submit}
              type="submit"
              disabled={submit.status}
            >
              Sign In
            </ButtonSubmit>
          </>
        )}
      />
      <ForgotLink onClick={() => history.push(ROUTE_FORGOTPASSWORD)}>
        Forgotten password?
      </ForgotLink>
      <Footer>
        Don’t have an account?
        <SignUpLink onClick={() => history.push(ROUTE_REGISTRATION)}>
          Sign Up
        </SignUpLink>
      </Footer>
    </LoginLayout>
  );
};

const Title = styled.h1`
  font-size: 2.4rem;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: #667784;
  margin-bottom: 8px;
`;

const Subtitle = styled.h3`
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: #667784;
  font-size: 1.6rem;
  margin-bottom: 48px;
`;

const Footer = styled.div`
  font-size: 16px;
  color: #667784;
`;

const SignUpLink = styled.span`
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
  margin-bottom: 15px;
`;

const Icon = styled.i`
  font-size: 14px;
  color: #667784;
  position: absolute;
  top: 19px;
  left: 17px;
  bottom: 0;
`;

const ButtonSubmit = styled.button<{ isSubmitting: boolean }>`
  width: 100%;
  padding-top: 15px;
  padding-bottom: 17px;
  font-size: 1.6rem;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-bottom: 15px;
  color: #ffffff;
  font-weight: 400;
  background-color: ${({ isSubmitting }) =>
    isSubmitting ? "#23527c" : "#48bbff"};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px 0 rgb(72 187 255 / 100%);
  }
`;

const ForgotLink = styled.a`
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

const ErrorValidation = styled.span`
  font-size: 1.6rem;
  align-self: flex-start;
  margin-top: 8px;
  margin-bottom: 2px;
  color: #f05f62;
`;

export default SignIn;
