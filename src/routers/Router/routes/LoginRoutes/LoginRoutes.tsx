import { ForgotPassword, SignIn, SignUp } from "components";
import { Routes } from "lib/const/routes";
import { useAppSelector } from "lib/hooks";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function LoginRoutes() {
  const { isValid } = useAppSelector((state) => state.auth);

  return (
    <>
      <Route path={Routes.REGISTRATION}>
        {!isValid ? <SignUp /> : <Redirect to={Routes.PROFILE} />}
      </Route>
      <Route path={Routes.FORGOTPASSWORD}>
        <ForgotPassword />
      </Route>
      <Route path={Routes.LOGIN}>
        {!isValid ? <SignIn /> : <Redirect to={Routes.PROFILE} />}
      </Route>
    </>
  );
}
