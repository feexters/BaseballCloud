import { LeaderBoard, Network } from "components";
import { Profile } from "components/Profile";
import { ROUTE_LEADERBOARD, ROUTE_LOGIN, ROUTE_MAIN, ROUTE_NETWORK, ROUTE_PROFILE } from "lib/const/routes";
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
import { LoginRoutes } from "./routes";

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
        <Route exact path={ROUTE_MAIN}>
          {!isValid ? <Redirect to={ROUTE_LOGIN} /> : <Redirect to={ROUTE_PROFILE} />}
        </Route>
        <Route path={ROUTE_PROFILE}>
          {!isValid ? <Redirect to={ROUTE_LOGIN} /> : <Profile />}
        </Route>
        <Route path={ROUTE_NETWORK}>
          {!isValid ? <Redirect to={ROUTE_NETWORK} /> : <Network />}
        </Route>
        <Route path={ROUTE_LEADERBOARD}>
          {!isValid ? <Redirect to={ROUTE_LEADERBOARD} /> : <LeaderBoard />}
        </Route>
        <LoginRoutes />
      </Switch>
    </Router>
  );
};

export default HomeRouter;
