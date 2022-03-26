import { XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiConfig } from "../../api/config";
import { removeOrder } from "../../redux/reducers/orderSlice";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

function prepareOrderToCheckout(orders) {
  let items = [];
  orders.forEach((o) => {
    items.push({ ...o, quantity: 1 });
  });
  return items;
}

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authState);
  const { orders } = useSelector((state) => state.orderState);
  const [checkout, setCheckout] = useState(prepareOrderToCheckout(orders));

  const getQuantity = (itemId) => {
    let item = checkout.find((c) => c._id === itemId);
    return item.quantity;
  };

  const changeQuantity = (itemId, value) => {
    let orders = [];
    checkout.forEach((c) => {
      let data = c;
      if (data._id === itemId) {
        data.quantity = value;
      }
      orders.push(data);
    });
    return orders;
  };

  const handleQuantity = (itemId, value) => {
    setCheckout(changeQuantity(itemId, value));
  };

  const handleRemove = (item) => {
    setCheckout(checkout.filter((c) => c._id !== item._id));
    dispatch(removeOrder(item));
  };

  const calculatePrice = () => {
    let total = 0;
    checkout.forEach(
      (c) => (total += parseInt(c.quantity) * parseFloat(c.price))
    );
    return total;
  };

  const handleToken = (token) => {
    let body = {
      token,
      checkout,
      total: calculatePrice(),
    };
    return axios
      .post(ApiConfig.ORDER.createOrder, body, {
        headers: {
          ...ApiConfig.HEADERS,
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res))
      .catch((error) =>
        toast.error(
          error.response?.data?.message ??
            error.message ??
            "Internal server error."
        )
      );
  };

  return orders.length < 1 ? (
    <div className="w-full h-full grid place-items-center">
      <h3>No items in order</h3>
    </div>
  ) : (
    <div className="w-full h-full flex">
      <aside className="w-full p-4 overflow-auto">
        <h2 className="text-4xl font-bold">My order</h2>
        <section className="w-full flex flex-col gap-2">
          {orders.map((item) => (
            <OrderCard
              key={item._id}
              item={item}
              quantity={getQuantity(item._id)}
              handleQuantity={handleQuantity}
              handleRemove={handleRemove}
            />
          ))}
        </section>
      </aside>
      <aside className="w-full p-4">
        <h2 className="text-4xl font-bold">Confirm order</h2>
        <table className="table-fixed w-full my-4">
          <thead className="bg-gray-200 border-2">
            <tr>
              <th>Item</th>
              <th className="border-l-2">Quantity</th>
              <th className="border-l-2">Price ($)</th>
            </tr>
          </thead>
          <tbody className="border-2">
            {checkout.map((c) => (
              <tr className="border-2">
                <td className="px-2">{c.name}</td>
                <td className="border-l-2 text-center">{c.quantity}</td>
                <td className="border-l-2 text-center">
                  {parseInt(c.quantity) * parseFloat(c.price)}
                </td>
              </tr>
            ))}
            <tr className="px-2 text-2xl">
              <td className="px-2">Grand Total</td>
              <td className="border-l-2 text-right">{calculatePrice()}</td>
            </tr>
          </tbody>
        </table>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_SECRET}
          token={handleToken}
          email={user.email}
          shippingAddress
        >
          <button className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded w-full">
            Confirm
          </button>
        </StripeCheckout>
      </aside>
    </div>
  );
};

const OrderCard = ({ item, quantity, handleQuantity, handleRemove }) => {
  return (
    <section className="w-full flex bg-white rounded-md items-start justify-between p-2">
      <aside className="flex">
        <img alt="item" width={200} height={200} src={item.image.url} />
        <div className="p-2">
          <div>
            <h4 className="font-bold text-2xl">{item.name}</h4>
            <p className="text-gray-600">{item.type}</p>
            <p className="font-semibold text-l">${item.price}</p>
          </div>
          <div>
            Quantity:
            <input
              min={1}
              type="number"
              value={quantity}
              onChange={(e) => handleQuantity(item._id, e.target.value)}
              className="mx-2 border-2 w-12 rounded-md outline-orange-400"
            />
          </div>
        </div>
      </aside>
      <div
        className="p-2 rounded-full cursor-pointer hover:bg-gray-100 hover:text-red-500"
        onClick={() => handleRemove(item)}
      >
        <XIcon width={16} />
      </div>
    </section>
  );
};

export default OrdersPage;
