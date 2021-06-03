import { useReactiveVar, gql, useMutation } from "@apollo/client";
import Layout from "../component/Layout";
import UserState from "../state/UserState";
import StripeCheckout from "react-stripe-checkout";

const cart = () => {
  const userState = useReactiveVar(UserState);

  const [deleteItem, { loading }] = useMutation(DELETE_CART_ITEM, {
    onCompleted: (data) => {
      UserState({ ...userState, cartSet: [data.deleteCartItem.cart] });
    },
  });

  const [makePayment] = useMutation(MAKE_PAYMENT_MUTATION, {
    onCompleted: (data) => {
      UserState({ ...userState, cartSet: [data.pay.cart] });
    },
  });

  const onToken = async (token) => {
    let res = await makePayment({
      variables: {
        token: token.id,
      },
    });
  };

  return (
    <Layout isPrivate={true}>
      <div className="px-10 md:w-3/5 mx-auto">
        {" "}
        <h3 className="text-center font-semibold text-gray-500">
          {" "}
          Your Items{" "}
        </h3>{" "}
        {userState.cartSet[0] ? (
          <div className="grid grid-flow-row gap-3 mt-5">
            <div className="hover:shadow-md inline-flex justify-between border-gray-200 border-b-2 rounded-lg p-4">
              {" "}
              <span className="font-semibold">Item Name</span>
              <span className="font-semibold"> Price </span>{" "}
            </div>{" "}
            {userState.cartSet[0].cartitemSet.map(({ item, id }) => (
              <div className="hover:shadow-md  inline-flex justify-between border-gray-200 border-b-2 p-4 rounded-lg">
                <span className="text-gray-900"> {item.itemName} </span>
                <button
                  onClick={() => deleteItem({ variables: { id } })}
                  className=" inline-flex btn hover:bg-red-500 hover:text-white"
                >
                  {" "}
                  Delete{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>{" "}
                </button>
                <span className="text-gray-900"> $ {item.price} </span>
              </div>
            ))}{" "}
            <div className="hover:shadow-md inline-flex justify-between border-gray-200 border-b-2 p-4 rounded-lg">
              <span className="font-bold"> Total </span>

              <span className="font-extrabold">
                $ {userState.cartSet[0].total}{" "}
              </span>
            </div>
            <div className="mt-4 flex  flex-row-reverse">
              {userState.cartSet[0] && userState.cartSet[0].total ? (
                <StripeCheckout
                  email={userState.email}
                  token={onToken}
                  stripeKey="pk_test_x8ZvtR1dzwKTMiBUOHvHmUi400OlqSsnHz"
                  amount={userState.cartSet[0].total * 100}
                >
                  <button className="btn bg-blue-500 text-white font-bold">
                    Buy
                  </button>{" "}
                </StripeCheckout>
              ) : null}{" "}
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

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

export default cart;
