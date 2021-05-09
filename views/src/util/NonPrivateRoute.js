import { Route, Redirect } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";

import { UserState } from "../App";

const NonPrivateRoute = ({ component: Component, ...rest }) => {
  const userState = useReactiveVar(UserState);

  return (
    <Route
      {...rest}
      render={(props) =>
        userState.firstName ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default NonPrivateRoute;
