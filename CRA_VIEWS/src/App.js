import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { gql, makeVar, useQuery } from "@apollo/client";

import Navbar from "./component/Navbar/Navbar";
import Auth from "./pages/auth";
import Index from "./pages/index";
import NonPrivateRoute from "./util/NonPrivateRoute";
import PrivateRoute from "./util/PrivateRoute";

import "./styles/global.scss";
import Cart from "./pages/Cart";

export const UserState = makeVar({
  id: null,
  firstName: null,
  lastName: null,
  verified: null,
  token: localStorage.getItem("token"),
  cartSet: [],
  email: null,
});

function App() {
  const { data, loading, error } = useQuery(ME_QUERY);

  if (!loading && !error) {
    if (data.me) {
      UserState(data.me);
    }
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <NonPrivateRoute exact path="/auth" component={Auth} />

          {/* <SellerOnlyRoute exact path="/dashboard" component={Dashboard} /> */}
          {/* <SellerOnlyRoute exact path="/add-item" component={AddItem} /> */}

          <PrivateRoute exact path="/cart" component={Cart} />

          <Route path="/" exact component={Index} />
        </Switch>
      </Router>
    </div>
  );
}

export const ME_QUERY = gql`
  query {
    me {
      id
      firstName
      lastName
      email
      cartSet {
        id
        total
        __typename
        cartitemSet {
          id
          item {
            id
            itemName
            price
          }
        }
      }
    }
  }
`;

export default App;
