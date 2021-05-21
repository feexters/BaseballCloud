import { client, CURRENT_PROFILE } from "apollo";
import { LeaderBoard, Network } from "components";
import { Profile } from "components/Profile";
import {
  ROUTE_LEADERBOARD,
  ROUTE_LOGIN,
  ROUTE_MAIN,
  ROUTE_NETWORK,
  ROUTE_PROFILE,
} from "lib/const/routes";
import { useAppSelector } from "lib/hooks";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LoginRoutes } from "./routes";

const Router = () => {
  const { isValid } = useAppSelector((state) => state.auth);

  const { current_profile } = client.readQuery({
    query: CURRENT_PROFILE,
  }) || { current_profile: null };

  return (
    <Switch>
      <Route exact path={ROUTE_MAIN}>
        {!isValid ? (
          <Redirect to={ROUTE_LOGIN} />
        ) : (
          <Redirect to={ROUTE_PROFILE} />
        )}
      </Route>
      <Route path={ROUTE_PROFILE}>
        {!isValid ? <Redirect to={ROUTE_LOGIN} /> : <Profile id={current_profile.id} />}
      </Route>
      <Route path={ROUTE_NETWORK}>
        {!isValid ? <Redirect to={ROUTE_NETWORK} /> : <Network />}
      </Route>
      <Route path={ROUTE_LEADERBOARD}>
        {!isValid ? <Redirect to={ROUTE_LEADERBOARD} /> : <LeaderBoard />}
      </Route>

      <LoginRoutes />
    </Switch>
  );
};

export default Router;
