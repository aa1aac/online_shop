import React from "react";

export default function Items({
  data: { itemName, coverImage, description, price },
}) {
  return (
    <div className="col">
      <div
        className="card "
        style={{ width: "16rem", margin: "1em", minHeight: "27rem" }}
      >
        <img
          src={coverImage}
          className="card-img-top"
          alt={itemName}
          style={{
            display: "block",
            minWidth: "14rem",
            maxWidth: "16rem",
            minHeight: "13rem",
            maxHeight: "13rem",
          }}
        />
        <div className="card-body">
          <h2> {itemName} </h2>
          {/* <p className="card-text">{description}</p> */}

          <p>
            {" "}
            <b> $ {price} </b>{" "}
          </p>

          <button className="btn btn-secondary"> View Item </button>
        </div>
      </div>
    </div>
  );
}
