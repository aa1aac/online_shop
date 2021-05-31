import gql from "graphql-tag";
import React from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import StripeCheckout from "react-stripe-checkout";
import { UserState } from "../App";

export default function Cart() {
  const userState = useReactiveVar(UserState);

  const [makePayment] = useMutation(MAKE_PAYMENT_MUTATION);

  const [deleteItem, { loading }] = useMutation(DELETE_CART_ITEM);

  const onToken = async (token) => {
    let res = await makePayment({
      variables: {
        token: token.id,
      },
    });

    if (res.data.success) {
      // redirect to the
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Your cart</h2>

      <ul className="list-group">
        {userState.cartSet[0]
          ? userState.cartSet[0].cartitemSet.map(({ item, id }) => {
              return (
                <li className="list-group-item d-flex justify-content-between">
                  <h4>
                    {item.itemName} $ {item.price}
                  </h4>
                  <button
                    className="btn btn-danger "
                    disabled={loading}
                    onClick={() => deleteItem({ variables: { id } })}
                  >
                    delete Item
                  </button>
                </li>
              );
            })
          : null}

        <li className="list-group-item">
          <h3>
            total :{" "}
            <em>
              $ {userState.cartSet[0] ? userState.cartSet[0].total : null}{" "}
            </em>{" "}
          </h3>

          {userState.cartSet[0] && userState.cartSet[0].total ? (
            <StripeCheckout
              email={userState.email}
              token={onToken}
              stripeKey="pk_test_x8ZvtR1dzwKTMiBUOHvHmUi400OlqSsnHz"
              amount={userState.cartSet[0].total * 100}
            >
              <button className="btn btn-primary btn-block">Pay</button>
            </StripeCheckout>
          ) : null}
        </li>
      </ul>
    </div>
  );
}

const MAKE_PAYMENT_MUTATION = gql`
  mutation ($token: String!) {
    pay(token: $token) {
      success
      errors
      cart {
        id
        total
        cartitemSet {
          id
          item {
            itemName
            price
          }
        }
      }
    }
  }
`;

const DELETE_CART_ITEM = gql`
  mutation ($id: String!) {
    deleteCartItem(id: $id) {
      cart {
        id
        total
        cartitemSet {
          id
          item {
            itemName
            price
          }
        }
      }
    }
  }
`;
