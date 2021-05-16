import { ForgotPassword, SignIn, SignUp } from "components";
import { Profile } from "components/Profile";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { Auth } from "lib/utils";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { validateToken } from "store/sagas";

const HomeRouter = () => {
  const dispatch = useAppDispatch();
  const { headers, isValid } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (Auth.getHeaders()["access-token"]) {
      dispatch(validateToken());
    }
  }, [headers, dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!isValid ? <SignIn /> : <Redirect to="/profile" />}
        </Route>
        <Route path="/login">
          {!isValid ? <SignIn /> : <Redirect to="/profile" />}
        </Route>
        <Route path="/profile">
          {!isValid ? <Redirect to="/login" /> : <Profile />}
        </Route>
        <Route path="/registration">
          <SignUp />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
      </Switch>
    </Router>
  );
};

export default HomeRouter;
