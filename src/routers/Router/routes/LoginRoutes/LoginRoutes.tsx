import { ForgotPassword, SignIn, SignUp } from "components";
import {
  ROUTE_FORGOTPASSWORD,
  ROUTE_LOGIN,
  ROUTE_PROFILE,
  ROUTE_REGISTRATION,
} from "lib/const/routes";
import { useAppSelector } from "lib/hooks";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function LoginRoutes() {
  const { isValid } = useAppSelector((state) => state.auth);

  return (
    <>
      <Route path={ROUTE_REGISTRATION}>
        <SignUp />
      </Route>
      <Route path={ROUTE_FORGOTPASSWORD}>
        <ForgotPassword />
      </Route>
      <Route path={ROUTE_LOGIN}>
        {!isValid ? <SignIn /> : <Redirect to={ROUTE_PROFILE} />}
      </Route>
    </>
  );
}
