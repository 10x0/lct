import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../api/config";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
const Users = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [token,setToken] = useState('');
  useEffect(() => {
    setLoading(true);
    setToken(localStorage.getItem("_t"));
    axios
      .get(API.ORDER.getAllOrders, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data.allOrders));
    setLoading(false);
  }, [refresh,token]);

  const deliver = async (id) => {
    await axios
      .put(`${API.ORDER.deliverOrder}/${id}`,{deliverd:true}, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) =>
        toast.error(
          error.response?.data?.message ??
            error.message ??
            "Internal server error."
        )
      );
    setLoading(false);
    setRefresh(!refresh);
  };

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
            <th className="border-l-2">Delivered</th>
          </tr>
        </thead>
        <tbody className="border-2">
          {orders.map((o) => (
            <tr key={o._id} className="border-2">
              <td className="px-2">{o.customer}</td>
              <td className="border-l-2 px-2">
                <ul className="list-disc list-inside">
                  {o.items.map((item) => (
                    <li key={item._id}>{item.name}</li>
                  ))}
                </ul>
              </td>
              <td className="border-l-2 text-center">{o.total}</td>
              <td className="border-l-2 text-center">
                {
                o.delivered ? 
                <p className='text-green-500 font-semibold'>Delivered</p>
                :
                <button onClick={()=>deliver(o._id)} className='bg-orange-500 inline px-4 rounded text-white cursor-pointer hover:bg-orange-400 font-semibold'>Deliver</button>
                }
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
};

export default Users;
