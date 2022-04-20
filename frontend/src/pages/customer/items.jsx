import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../api/config";
import ItemCard from "../../components/Item/Card";

const Items = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      await axios
        .get(API.ITEM.getAllItems, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("_t")}`,
          },
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
    fetchItems();
  }, []);
  return (
    <div className="m-7 flex flex-wrap">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Items;
