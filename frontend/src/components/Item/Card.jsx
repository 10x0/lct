import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, removeOrder } from "../../redux/reducers/orderSlice";

const ItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authState);
  const { orders } = useSelector((state) => state.orderState);

  const addItem = (item) => {
    dispatch(addOrder(item));
  };
  const removeItem = (item) => {
    dispatch(removeOrder(item));
  };

  return (
    <div className="m-4 flex flex-col items-center bg-white p-2 border-2 border-gray-100 rounded-xl shadow-lg cursor-pointer md:hover:scale-105">
      <div className="w-70 md:w-60 h70 md:h-60 flex items-center">
        <img className="rounded-xl" src={item.image.url} alt="product" />
      </div>
      <p className="text-xl text-center">{item.name}</p>
      <div>
        <p className="text-gray-400 text-center">{item.type}</p>
        <p className="text-orange-500 text-center">Rs.{item.price}</p>
      </div>
      {user ? (
        user.role !== "admin" ? (
          orders.includes(item) ? (
            <button
              className="m-2 py-2 px-4 bg-gray-400 hover:bg-gray-500 text-white rounded"
              onClick={() => removeItem(item)}
            >
              Remove from order
            </button>
          ) : (
            <button
              className="m-2 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded"
              onClick={() => addItem(item)}
            >
              Add to Order
            </button>
          )
        ) : (
          <div>
            <button className="m-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded">
              Edit
            </button>
            <button className="m-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded">
              Delete
            </button>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default ItemCard;
