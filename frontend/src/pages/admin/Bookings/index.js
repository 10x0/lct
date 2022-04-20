import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../api/config";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";

const Bookings = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [token,setToken] = useState('');
  useEffect(() => {
    setLoading(true);
    setToken(localStorage.getItem("_t"));
    axios
      .get(API.BOOKING.getAllBookings, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(res.data.allBookings));
    setLoading(false);
  }, [refresh,token]);

  const remove = async (id) => {
    await axios
      .delete(`${API.BOOKING.deleteBooking}/${id}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setShow(false);
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
      <h2 className="text-4xl font-bold">Current bookings</h2>
      <table className="table-fixed w-full my-4">
        <thead className="bg-gray-200 border-2">
          <tr>
            <th>Contact</th>
            <th className="border-l-2">Seats</th>
            <th className="border-l-2">Date</th>
            <th className="border-l-2">Time</th>
            <th className="border-l-2">Duration</th>
            <th className="border-l-2">Delete</th>
          </tr>
        </thead>
        <tbody className="border-2">
          {bookings.map((booking)=>
        <tr className="border-2" key={booking._id}>
            <td className="text-center">{booking.contact}</td>
            <td className="border-l-2 text-center">{booking.seats}</td>
            <td className="border-l-2 text-center">{booking.date}</td>
            <td className="border-l-2 text-center">{booking.time}</td>
            <td className="border-l-2 text-center">{booking.duration}</td>
            <td className="border-l-2 text-center">
              <button onClick={()=>setShow(true)} className='bg-red-500 inline px-4 rounded text-white cursor-pointer hover:bg-red-400 font-semibold'>Delete</button></td>
              <DeleteModal show={show} setShow={(value)=>setShow(value)} name={booking.contact} date={booking.date}remove={()=>remove(booking._id)} />
          </tr>
          )}
        </tbody>
      </table>
    </aside>
  );
};

export default Bookings;

const DeleteModal=({show,setShow,name,date,remove})=>{

  return <div className={`shadow-lg backdrop-blur fixed top-0 left-0 w-screen h-screen ${show ? 'flex' : 'hidden'}`}>
      <section className="m-auto bg-gray-200 z-10 p-4 rounded-lg">
        <p className="text-lg font-semibold">Are you sure to delete this item?</p>
        <p className="text-lg"> Contact: {name}</p>
        <p className="text-lg"> Date: {date}</p>
        <div>
                <button className="bg-gray-100 hover:bg-white p-2 rounded px-4" onClick={()=>setShow(false)}>
                  Cancel
                </button>
                <button
                onClick={remove}
                  className="bg-red-500 rounded p-2 px-4 m-2 text-white font-semibold hover:bg-red-600"
                  >
                  Delete
                </button>
        </div>
      </section>
  </div>
}