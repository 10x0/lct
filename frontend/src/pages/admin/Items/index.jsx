import { PlusSmIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../../api/config";
import ItemCard from "../../../components/Item/Card";
import Loading from "../../../components/Loading";

const ItemsPage = () => {
  const [show, setShow] = useState(false);
  const [edit,setEdit]=useState(false);
  const [editItem,setEditItem]=useState({});
  const [del,setDel]=useState(false);
  const [deleteItem,setDeleteItem]=useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("Veg");
  const [image, setImage] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addItemLoading, setAddItemLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setAddItemLoading(true);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("image", image);
    await axios
      .post(API.ITEM.addItem, formData, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("_t")}`,
        },
      })
      .then((res) => {
        toast.success("Item added.");
        setName("");
        setPrice("0");
        setType("Veg");
        setImage("");
      })
      .catch((error) =>
        toast.error(
          error.response?.data?.message ??
            error.message ??
            "Internal server error."
        )
      );
    setAddItemLoading(false);
    setRefresh(!refresh);
    setShow(false);
  };

  useEffect(() => {
    const fetchItems = async () => {
      await axios
        .get(API.ITEM.getAllItems, {
          headers: API.HEADERS,
        })
        .then((res) => setItems(res.data.allItem))
        .catch((error) =>
          toast.error(
            error.response?.data?.message ??
              error.message ??
              "Internal server error.",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          )
        );
    };
    setLoading(true);
    fetchItems();
    setLoading(false);
  }, [refresh]);

  return loading ? (
    <div className="w-full h-full grid place-items-center">
      <Loading />
    </div>
  ) : (
    <aside className="p-4 flex-col w-full">
      <section className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <section className="relative">
          <button
            className="px-2 p-1 bg-gray-200 rounded-full text-sm flex items-center hover:bg-gray-300"
            onClick={() => setShow(true)}
          >
            <PlusSmIcon width={16} />
            Add item
          </button>
          <section
            className={`rounded-xl absolute top-full right-0 w-80 m-2 p-4 bg-gray-200 z-50  ${
              show ? "block" : "hidden"
            }`}
          >
            <section className="flex justify-between items-center border-b-2 border-gray-300">
              <h2 className="text-l font-semibold">Add Item</h2>
              <div
                className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
                onClick={() => setShow(false)}
              >
                <XIcon width={16} />
              </div>
            </section>
            {addItemLoading ? (
              <div className="w-full h-full grid place-items-center">
                <Loading />
              </div>
            ) : (
              <form
                className="py-2 flex flex-col"
                onSubmit={onSubmit}
                encType="multipart/form-data"
              >
                <div className="flex justify-between items-center">
                  <label>Item name:</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter item name"
                    className="p-2 rounded m-2 outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label>Price (NPR):</label>
                  <input
                    required
                    type="number"
                    placeholder="Enter item name"
                    className="p-2 rounded m-2 outline-none"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <label>Type:</label>
                  <select
                    className="p-2 rounded m-2 outline-none"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Egg">Egg</option>
                  </select>
                </div>
                <div className="self-center w-1/2">
                  <img
                    className="h-full"
                    src={
                      image
                        ? image
                        : "data:image/png;base64,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"
                    }
                    alt="new-item"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="w-full text-center p-2 rounded m-2 outline-none  bg-gray-400 text-white cursor-pointer hover:bg-gray-500">
                    Select image
                    <input
                      required
                      type="file"
                      accept="image/*"
                      className="w-full hidden"
                      onChange={imageHandler}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-red-500 rounded p-2 m-2 text-white font-semibold hover:bg-red-600"
                >
                  Submit
                </button>
              </form>
            )}
          </section>
        </section>
      </section>
      <aside className="">
        <section className="flex flex-grow">
          {items ? (
            items.map((item) => <ItemCard key={item._id} item={item} setEdit={(value)=>{setEdit(value);setEditItem(item);}} setDel={(value)=>{
              setDel(value);
              setDeleteItem(item);
            }} />)
          ) : (
            <h3>No items</h3>
          )}
        </section>
      </aside>
      {edit &&
      <EditModal show={edit} setShow={(value)=>setEdit(value)} editItem={editItem} item={editItem} refresh={refresh} setRefresh={(value)=>setRefresh(value)} setLoading={(value)=>setLoading()} />  }

      {del && <DeleteModal show={del} setShow={(value)=>setDel(value)} item={deleteItem} refresh={refresh} setRefresh={(value)=>setRefresh(value)} setLoading={(value)=>setLoading()} />
       }
    </aside>
  );
};

export default ItemsPage;


const EditModal=({show,setShow,item,refresh,setRefresh})=>{
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    setName(item.name);
    setPrice(item.price);
    setType(item.type);
    setImage(item.image.url);
  },[item.name,item.price,item.type,item.image]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("image", image);
    await axios
      .put(`${API.ITEM.editItem}/${item._id}`, formData, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("_t")}`,
        },
      })
      .then((res) => {
        setLoading(false);
        toast.success("Item edited.");
      })
      .catch((error) =>{
        setLoading(false);
        toast.error(
          error.response?.data?.message ??
            error.message ??
            "Internal server error."
        )
      }
      );
    setRefresh(!refresh);
    setShow(false);
  };

  
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return <div className={`shadow-lg backdrop-blur fixed top-0 left-0 w-screen h-screen ${show ? 'flex' : 'hidden'}`}>
      <section className="m-auto bg-gray-200 z-10 p-4 rounded-lg">
        <p className="text-lg font-semibold">Edit</p>
        <form
               className="py-2 flex flex-col"
                onSubmit={onSubmit}
                encType="multipart/form-data"
              >
                <div className="flex justify-between items-center">
                  <label>Item name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter item name"
                    className="p-2 rounded m-2 outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label>Price (NPR):</label>
                  <input
                    type="number"
                    placeholder="Enter item price"
                    className="p-2 rounded m-2 outline-none"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <label>Type:</label>
                  <select
                    className="p-2 rounded m-2 outline-none"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Egg">Egg</option>
                  </select>
                </div>
                <div className="self-center w-1/2">
                  <img
                    className="h-full w-80"
                    alt="new-item"
                    src={image}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="w-full text-center p-2 rounded m-2 outline-none  bg-gray-400 text-white cursor-pointer hover:bg-gray-500">
                    Select image
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full hidden"
                      onChange={imageHandler}
                    />
                  </label>
                </div>
                {loading ? <Loading />:
              <div>
                <button className="bg-gray-100 hover:bg-white p-2 rounded px-4" onClick={()=>setShow(false)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-400 rounded p-2 px-4 m-2 text-white font-semibold hover:bg-orange-500"
                  >
                  Submit
                </button>
                </div>}
              </form>
      </section>
  </div>
}

const DeleteModal=({show,setShow,item,refresh,setRefresh,setLoading})=>{

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .delete(`${API.ITEM.editItem}/${item._id}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("_t")}`,
        },
      })
      .then((res) => {
        toast.success("Item deleted successfully.");
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
    setShow(false);
  };

  return <div className={`shadow-lg backdrop-blur fixed top-0 left-0 w-screen h-screen ${show ? 'flex' : 'hidden'}`}>
      <section className="m-auto bg-gray-200 z-10 p-4 rounded-lg">
        <p className="text-lg font-semibold">Are you sure to delete this item?</p>
        <p className="text-lg"> - {item.name}</p>
        <div>
                <button className="bg-gray-100 hover:bg-white p-2 rounded px-4" onClick={()=>setShow(false)}>
                  Cancel
                </button>
                <button
                onClick={onSubmit}
                  className="bg-red-500 rounded p-2 px-4 m-2 text-white font-semibold hover:bg-red-600"
                  >
                  Delete
                </button>
        </div>
      </section>
  </div>
}