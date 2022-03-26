import { useEffect, useState } from "react";
import axios from "axios";
import { ApiConfig } from "../../../api/config";
import Loading from "../../../components/Loading";
const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(ApiConfig.ORDER.getAllOrders, {
        headers: ApiConfig.HEADERS,
      })
      .then((res) => setOrders(res.data.allOrders));
    setLoading(false);
  }, []);
  return loading ? (
    <div className="w-full h-full grid place-items-center">
      <Loading />
    </div>
  ) : (
    <aside className="p-4 flex-col w-full">
      <h2 className="text-4xl font-bold">Current orders</h2>
      <table className="table-fixed w-full my-4">
        <thead className="bg-gray-200 border-2">
          <tr>
            <th>Item</th>
            <th className="border-l-2">Quantity</th>
            <th className="border-l-2">Paid ($)</th>
          </tr>
        </thead>
        <tbody className="border-2">
          {orders.map((o) => (
            <tr key={o._id} className="border-2">
              <td className="px-2">{o.user.name}</td>
              <td className="border-l-2 px-2">
                <ul className="list-disc list-inside">
                  {o.items.map((item) => (
                    <li key={item._id}>{item.name}</li>
                  ))}
                </ul>
              </td>
              <td className="border-l-2 text-center">{o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
};

export default Orders;
