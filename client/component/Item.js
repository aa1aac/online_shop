import { useState } from "react";

const Item = ({ item }) => {
  const [displayInfo, setDisplayInfo] = useState(false);

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
            ? "h-full w-full absolute z-40  left-0 top-0 flex justify-center items-center bg-white bg-opacity-10"
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
            className="object-scale-down h-32 w-full"
          />{" "}
          <div className="p-5 text-md font-semibold">{item.description}</div>
          <span className="btn bg-green-500 m-3"> $ {item.price} </span>
          <div class="flex justify-end items-center w-100 border-t p-3 mt-2">
            <button className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal">
              close
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-white">
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
