import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState, useCallback } from "react";
import Items from "../component/Items/Items";

export default function Home() {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState(null);
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
        search,
      },
    });
  }, []);

  return (
    <div className="container">
      {" "}
      <div className="row">
        {data
          ? data.items.map((item) => {
              return <Items data={item} key={item.id} />;
            })
          : null}
      </div>
      {/* pagination */}
      {hasMoreItems ? (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className="page-item"
              onClick={async () => {
                setSkip(skip + data.items.length);

                let res = await fetchMore({
                  variables: {
                    first: 5,
                    skip,
                    search,
                  },
                });

                setHasMoreItems(!!res.data.items.length);
              }}
            >
              <button className="page-link" disabled={loading}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
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
