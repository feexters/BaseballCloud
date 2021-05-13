import { Footer } from "components/Footer";
import { Header } from "components/Header";
import Login from "components/Login/Login";
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
import styled from "styled-components";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { headers, isValid } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(validateToken())
  }, [headers, dispatch])

  return (
    <Router>
      <Wrap>
        <Header />
        <Switch>
          <Route exact path="/">
            {!isValid ? <Redirect to="/login" /> : <Redirect to="/profile" />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
        <Footer />
      </Wrap>
    </Router>
  );
};

const Wrap = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export default HomeScreen;
