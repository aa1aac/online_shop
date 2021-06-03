import Layout from "../component/Layout";
import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";

import Item from "../component/Item";
import Items from "../state/ItemsState";

export default function Home() {
  const items = useReactiveVar(Items);
  const [fetchMoreBtn, setFetchMoreBtn] = useState(true);

  const [getItems, loading] = useLazyQuery(GET_ITEMS_QUERY, {
    onCompleted: (data) => {
      if (data.items.length === 0) {
        setFetchMoreBtn(false);
      }

      Items({ ...items, data: [...items.data, ...data.items] });
    },
  });

  useEffect(() => {
    getItems({ variables: { first: 5 } });
  }, []);

  const fetchMoreItems = () => {
    getItems({ variables: { first: 5, skip: items.data.length } });
  };

  return (
    <Layout>
      <main className=" grid  md:grid-cols-3 gap-10 px-7">
        {items.data ? items.data.map((item) => <Item item={item} />) : null}
      </main>
      {items.data && fetchMoreBtn ? (
        <button
          onClick={fetchMoreItems}
          className="btn bg-blue-500 mt-4 mx-auto block mb-3 text-white hover:shadow-lg"
        >
          {" "}
          Vew More items{" "}
        </button>
      ) : null}
    </Layout>
  );
}

export const GET_ITEMS_QUERY = gql`
  query ($first: Int, $skip: Int, $search: String) {
    items(first: $first, skip: $skip, search: $search) {
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
