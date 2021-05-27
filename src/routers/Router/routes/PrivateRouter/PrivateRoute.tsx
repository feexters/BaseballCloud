import { Routes } from "lib/const";
import { useAppSelector } from "lib/hooks";
import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type IProps = FC<
  {
    component: React.ComponentType<any>;
  } & RouteProps
>;

const PrivateRoute: IProps = ({ component: Component, ...rest }) => {
  const {isValid} = useAppSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isValid ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={Routes.LOGIN}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
