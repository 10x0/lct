import { XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../api/config";
import { removeAllOrders, removeOrder } from "../../redux/reducers/orderSlice";
import axios from "axios";
import { toast } from "react-toastify";
import KhaltiCheckout from "khalti-checkout-web";
import { useNavigate } from "react-router-dom";

function prepareOrderToCheckout(orders) {
  let items = [];
  orders.forEach((o) => {
    items.push({ ...o, quantity: 1 });
  });
  return items;
}


const OrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderState);
  const [checkout, setCheckout] = useState(prepareOrderToCheckout(orders));

  const getQuantity = (itemId) => {
    let item = checkout.find((c) => c._id === itemId);
    return item.quantity;
  };

  let config = {
    // replace this key with yours
    "publicKey": process.env.REACT_APP_KHALTI_KEY,
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
      onSuccess(payload) {
        let body = {
          checkout,
          token: payload.token,
          total: calculatePrice(),
        };
        return axios
          .post(API.ORDER.createOrder, body, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("_t")}`,
            },
          })
          .then((res) => {
            toast.success(
              '🚚 30 min ma ghar gate agaadi.',
              {position:toast.POSITION.TOP_CENTER}
            );
            dispatch(removeAllOrders());
            navigate('/menu');
          })
          .catch((error) =>
            toast.error(
              error.response?.data?.message ??
              error.message ??
              "Internal server error."
            )
          );
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log('widget is closing');
      }
    },
    "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  };

  const handleKhalti = () => {
    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 1000 });
  }


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
              <tr className="border-2" key={c.name}>
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
        <button onClick={handleKhalti} className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded w-full">
          Confirm
        </button>
      </aside>
    </div>
  );
};

const OrderCard = ({ item, quantity, handleQuantity, handleRemove }) => {
  return (
    <section className="w-full flex bg-white rounded-md items-start justify-between p-2 shadow-lg">
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
