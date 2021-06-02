import Layout from "../component/Layout";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

import Item from "../component/Item";

export default function Home() {
  const [getItems, data, loading] = useLazyQuery(GET_ITEMS_QUERY);

  useEffect(() => {
    getItems({
      variables: {
        first: 5,
        skip: 0,
      },
    });
  }, []);

  return (
    <Layout>
      <main className=" grid  md:grid-cols-3 gap-10 px-7">
        {data.data ? data.data.items.map((item) => <Item item={item} />) : null}
      </main>
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
