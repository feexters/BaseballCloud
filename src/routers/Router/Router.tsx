import { client, CURRENT_PROFILE } from "apollo";
import { LeaderBoard, Network } from "components";
import { Profile } from "components/Profile";
import { Routes } from "lib/const/routes";
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
      <Route exact path={Routes.MAIN}>
        {!isValid ? (
          <Redirect to={Routes.LOGIN} />
        ) : (
          <Redirect to={Routes.PROFILE} />
        )}
      </Route>
      <Route path={Routes.PROFILE_ID}>
        {!isValid ? <Redirect to={Routes.LOGIN} /> : <Profile currentId={current_profile.id} />}
      </Route>
      <Route path={Routes.PROFILE}>
        {!isValid ? <Redirect to={Routes.LOGIN} /> : <Profile currentId={current_profile.id} />}
      </Route>
      <Route path={Routes.NETWORK}>
        {!isValid ? <Redirect to={Routes.NETWORK} /> : <Network />}
      </Route>
      <Route path={Routes.LEADERBOARD}>
        {!isValid ? <Redirect to={Routes.LEADERBOARD} /> : <LeaderBoard />}
      </Route>

      <LoginRoutes />
    </Switch>
  );
};

export default Router;
