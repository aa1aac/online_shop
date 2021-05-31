import Layout from "../component/Layout";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

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

  console.log(data.data);

  return (
    <Layout>
      <main className=" grid  md:grid-cols-3 gap-10 px-7">
        {data.data
          ? data.data.items.map((item) => (
              <div className="card w-full relative">
                <img
                  src={item.coverImage}
                  alt={item.itemName}
                  className="w-full h-32 md:h-60 object-cover"
                />

                <h4 className="text-lg font-bold capitalize">
                  {" "}
                  {item.itemName}{" "}
                </h4>

                <span className="absolute top-0 bg-green-600 text-yellow-100 px-4 py-2 rounded-full font-semibold">
                  {" "}
                  $ {item.price}{" "}
                </span>

                <div className="flex items-end justify-end">
                  <button className="btn border-blue-500 border hover:bg-blue-500 hover:text-blue-100">
                    {" "}
                    View Item{" "}
                  </button>
                </div>
              </div>
            ))
          : null}
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
