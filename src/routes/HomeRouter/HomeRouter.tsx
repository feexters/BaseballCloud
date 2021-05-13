import { ForgotPassword, SignIn, SignUp } from "components";
import { Profile } from "components/Profile";
import { useAppDispatch, useAppSelector } from "lib/hooks";
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
    if (headers["access-token"]) {
      dispatch(validateToken());
    }
  }, [headers, dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          {/* {!isValid ? <Login /> : <Redirect to="/profile" />} */}
          <SignIn />
        </Route>
        <Route path="/profile">
          {!isValid ? <Redirect to="/profile" /> : <Profile />}
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
