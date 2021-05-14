import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Items from "../component/Items/Items";

export default function Home() {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState(null);

  const [getItems, { loading, data }] = useLazyQuery(GET_ITEMS_MUTATION, {
    variables: {
      first: 8,
      skip,
      search,
    },
  });

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container">
      {" "}
      <div className="row">
        {data
          ? data.items.map((item) => <Items data={item} key={item.id} />)
          : null}
      </div>
    </div>
  );
}

export const GET_ITEMS_MUTATION = gql`
  query ($first: Int, $skip: Int, $search: String, $myItems: Boolean) {
    items(first: $first, skip: $skip, search: $search, myItems: $myItems) {
      id
      images
      itemName
      price
      coverImage
      description
      images
    }
  }
`;
