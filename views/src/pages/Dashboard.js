import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_ITEMS_MUTATION } from "./index";
import Items from "../component/Items/Items";

const Dashboard = () => {
  const [getItems, { data, loading }] = useLazyQuery(GET_ITEMS_MUTATION, {
    myItems: true,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Dashboard</h2>

      <Link to="/add-item" className="btn btn-secondary btn-block">
        {" "}
        Add Item{" "}
      </Link>

      <div className="row">
        {data ? data.items.map((item) => <Items data={item} />) : null}
      </div>
    </div>
  );
};

export default Dashboard;
