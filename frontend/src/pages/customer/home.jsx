import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/kingdom-dinner.png";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <section className="flex-1 p-24">
        <h2 className="page__title text-6xl font-semibold">
          Food, <br />
          just like <br />
          your grandma <br />
          used to make.
        </h2>
        <div className="flex gap-2">
        <button
          className="mt-12 py-3 px-4 bg-orange-500 text-xl hover:bg-orange-600 text-white rounded"
          onClick={() => navigate("/menu")}
        >
          Discover our menu
        </button>
        <button
          className="mt-12 py-3 px-4 bg-gray-500 text-xl hover:bg-gray-600 text-white rounded"
          onClick={() => navigate("/book")}
        >
          Book a table
        </button></div>
      </section>
      <section className="flex-1">
        <img src={image} alt="section" />
      </section>
    </div>
  );
};

export default Homepage;
