import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import UserState from "../state/UserState";

const Item = ({ item }) => {
  const [displayInfo, setDisplayInfo] = useState(false);

  const [addToCart, { loading, error, called }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      variables: { itemId: item.id },
      onCompleted: (data) => {
        console.log(data);
        UserState({
          ...UserState(),
          cartSet: [
            {
              cartitemSet: data.addToCart.cart.cartitemSet,
              total: data.addToCart.cart.total,
            },
          ],
        });
      },
    }
  );

  return (
    <>
      <div className="card w-full relative">
        <img
          src={item.coverImage}
          alt={item.itemName}
          className="w-full h-32 md:h-60 object-cover"
        />

        <h4 className="text-lg font-bold capitalize"> {item.itemName} </h4>

        <span className="absolute top-0 bg-green-600 text-yellow-100 px-4 py-2 rounded-full font-semibold">
          {" "}
          $ {item.price}{" "}
        </span>

        <div className="flex items-end justify-end">
          <button
            className="btn border-blue-500 border hover:bg-blue-500 hover:text-blue-100"
            onClick={() => setDisplayInfo(true)}
          >
            {" "}
            View Item{" "}
          </button>
        </div>
      </div>

      <div
        className={
          displayInfo
            ? " w-full absolute z-40  left-0 top-0 flex justify-center items-center bg-white bg-opacity-10"
            : "hidden"
        }
      >
        <div class="bg-white rounded shadow-lg w-10/12 md:w-2/3">
          <div class="border-b px-4 py-2 flex justify-between items-center">
            <h3 class="font-semibold text-lg">{item.itemName}</h3>
          </div>
          <img
            src={item.coverImage}
            alt={item.itemName}
            className="object-scale-down shadow-sm h-48 w-full"
          />{" "}
          <div className="p-5 text-md font-semibold">{item.description}</div>
          <span className="btn bg-green-500 m-3"> $ {item.price} </span>
          <div className="grid grid-flow-col grid-cols-3 gap-4 mt-4 mx-3">
            {JSON.parse(item.images).map((src) => (
              <img
                id={src}
                src={src}
                className="w-full max-h-38 h-38 object-cover rounded-xl"
                alt="other images"
              />
            ))}
          </div>
          {error ? <div className="error"> {error.message} </div> : null}
          {!error && !loading && called ? (
            <div className="success"> item added to the cart </div>
          ) : null}
          <div className="flex justify-end items-center w-100 border-t p-3 mt-2">
            <button
              onClick={() => setDisplayInfo(false)}
              className="inline-flex btn  hover:bg-red-500 px-3 py-1 rounded hover:text-white mr-1 close-modal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              close
            </button>
            <button
              disabled={loading}
              onClick={addToCart}
              className="inline-flex btn bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
  return;
};

export default Item;

const ADD_TO_CART_MUTATION = gql`
  mutation ($itemId: String!) {
    addToCart(id: $itemId) {
      cart {
        id
        total
        cartitemSet {
          id
          item {
            itemName
            id
            price
          }
        }
      }
    }
  }
`;
