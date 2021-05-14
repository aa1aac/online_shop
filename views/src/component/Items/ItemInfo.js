import { Modal, Carousel } from "react-bootstrap";

function ItemInfo({
  show,
  setShow,
  data: { itemName, coverImage, price, description, images },
}) {
  images = JSON.parse(images);
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

          <button className=" btn btn-primary"> Add to Cart </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ItemInfo;
