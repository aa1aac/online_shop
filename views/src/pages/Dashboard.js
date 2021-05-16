import { Link } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

import Items from "../component/Items/Items";

const Dashboard = () => {
  const [getItems, { data, loading }] = useLazyQuery(GET_MY_ITEMS, {});

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
        {data
          ? data.myItems.map((item) => <Items data={item} isMyItem />)
          : null}
      </div>
    </div>
  );
};

const GET_MY_ITEMS = gql`
  query ($first: Int, $skip: Int, $search: String) {
    myItems(first: $first, skip: $skip, search: $search) {
      id
      itemName
      price
      description
      images
      createdOn
      coverImage
    }
  }
`;

export default Dashboard;
