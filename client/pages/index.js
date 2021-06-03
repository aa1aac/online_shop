import Layout from "../component/Layout";
import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState, useMemo } from "react";

import Item from "../component/Item";
import Items from "../state/ItemsState";

export default function Home() {
  const [skip, setSkip] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const [getItems, { loading, data, fetchMore }] = useLazyQuery(
    GET_ITEMS_QUERY,
    {
      onCompleted: (data) => {
        setSkip(data.items.length + skip);
      },
    }
  );

  useEffect(() => {
    getItems({
      variables: {
        first: 5,
        skip,
      },
    });
  }, []);

  const fetchMoreItems = async () => {
    await fetchMore({ variables: { first: 5, skip } });
    setSkip(skip + data.items.length);
  };

  return (
    <Layout>
      <main className="grid  md:grid-cols-3 gap-10 px-7">
        {data && data.items
          ? data.items.map((item) => <Item item={item} />)
          : null}
      </main>
      {hasMoreItems ? (
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
