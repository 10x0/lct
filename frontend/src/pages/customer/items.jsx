import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../api/config";
import ItemCard from "../../components/Item/Card";

const Items = () => {
  const [items, setItems] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    const fetchItems = async () => {
      await axios
        .get(API.ITEM.getAllItems, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("_t")}`,
          },
          params: {
            keyword: searchKey,
          }
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
  }, [searchKey]);
  return (
    <section>
      <div className="max-w-md m-auto">
      <div className="mb-2 md:mb-4 flex ml-2 justify-center items-center rounded-xl md:rounded bg-gray-100 p-2">
        <SearchIcon className="h-8 md:h-6 text-gray-600" />
        <input
          className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 w-96 group"
          type="text"
          value={searchKey}
          onChange={(event)=>setSearchKey(event.target.value)}
          placeholder="Looking for your favorite food . . ."
        />
      </div>
      </div>
    <div className="m-7 flex flex-wrap">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div></section>
  );
};

export default Items;
