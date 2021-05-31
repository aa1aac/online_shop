import { Route, Redirect } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";

import { UserState } from "../App";

const PrivaateRoute = ({ component: Component, ...rest }) => {
  const userState = useReactiveVar(UserState);

  return (
    <Route
      {...rest}
      render={(props) =>
        !userState.firstName ? (
          <Redirect to="/auth" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivaateRoute;
