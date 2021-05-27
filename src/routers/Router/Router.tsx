import { client, CURRENT_PROFILE } from "apollo";
import { LeaderBoard, Network, Scout } from "components";
import { Profile } from "components/Profile";
import { Routes } from "lib/const/routes";
import { useAppSelector } from "lib/hooks";
import React from "react";
import { Switch } from "react-router-dom";
import { LoginRoutes, PrivateRoute } from "./routes";

const Router = () => {
  const { auth_info } = useAppSelector((state) => state.auth);

  const { current_profile } = client.readQuery({
    query: CURRENT_PROFILE,
  }) || { current_profile: null };

  return (
    <Switch>
      <PrivateRoute
        exact
        path={Routes.MAIN}
        component={() => <Profile currentId={current_profile?.id || ""} />}
      />
      <PrivateRoute
        path={Routes.PROFILE_ID}
        component={() => <Profile currentId={current_profile?.id || ""} />}
      />
      <PrivateRoute
        path={Routes.PROFILE}
        component={() =>
          auth_info.role === "player" ? (
            <Profile currentId={current_profile?.id || ""} />
          ) : (
            <Scout />
          )
        }
      />
      <PrivateRoute path={Routes.NETWORK} component={() => <Network />} />
      <PrivateRoute path={Routes.LEADERBOARD} component={() => <LeaderBoard />} />

      <LoginRoutes />
    </Switch>
  );
};

export default Router;
