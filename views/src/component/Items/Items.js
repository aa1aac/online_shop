import React, { useState } from "react";
import ItemInfo from "./ItemInfo";

export default function Items({ data, ismyItems }) {
  const [show, setShow] = useState(false);
  const { itemName, coverImage, price } = data;
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

          <p>
            {" "}
            <b> $ {price} </b>{" "}
          </p>

          <button className="btn btn-secondary" onClick={() => setShow(true)}>
            {" "}
            View Item{" "}
          </button>

          <ItemInfo
            show={show}
            setShow={setShow}
            data={data}
            ismyItems={ismyItems}
          />
        </div>
      </div>
    </div>
  );
}
