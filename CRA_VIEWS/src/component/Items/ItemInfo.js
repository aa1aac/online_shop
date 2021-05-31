import { gql, useMutation } from "@apollo/client";
import { Modal, Carousel } from "react-bootstrap";
import { UserState } from "../../App";

function ItemInfo({
  show,
  setShow,
  data: { itemName, coverImage, price, description, images, id },
}) {
  images = JSON.parse(images);

  const [addToCart, { loading, error, called }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      variables: { itemId: id },
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

        console.log(data.addToCart.cart.cartitemSet);
      },
    }
  );

  return (
    <>
      <Modal
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        style={{ maxWidth: "100rem" }}
        dialogClassName="modal-90w"
      >
        <Modal.Header>
          <Modal.Title>{itemName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={coverImage}
            style={{
              display: "block",
              width: "16rem",
              height: "16rem",
              margin: "1.5em auto",
            }}
            alt={itemName}
          />

          <Carousel className="2em">
            {images
              ? images.map((image) => (
                  <Carousel.Item interval={1000}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={itemName}
                      style={{
                        height: "33rem",
                        margin: "1.5em auto",
                      }}
                    />
                  </Carousel.Item>
                ))
              : null}
          </Carousel>

          <p className="container" style={{ fontSize: "18px" }}>
            {description}
          </p>

          <b className="d-block mb-1">Price: $ {price} </b>

          <button
            className=" btn btn-primary"
            onClick={addToCart}
            disabled={loading}
          >
            {" "}
            Add to Cart{" "}
          </button>

          {error ? (
            <div className="alert alert-danger mt-3"> {error.message} </div>
          ) : null}

          {!loading && called && !error ? (
            <div className="alert alert-success mt-3">
              {" "}
              Item added to the cart{" "}
            </div>
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}

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

export default ItemInfo;
