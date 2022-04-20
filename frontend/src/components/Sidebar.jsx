import { LoginIcon, ViewGridIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/reducers/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState();

  const handleSelect = (name, route) => {
    setActive(name);
    navigate(route);
  };

  useEffect(() => {
    menus.map(
      (menu) => location.pathname.startsWith(menu.route) && setActive(menu.name)
    );
  }, [location.pathname]);

  return (
    <aside className="w-1/6 bg-gray-200 flex flex-col justify-between">
      <div className="p-2">
        {menus.map((menu) => {
          let Icon = menu.Icon;
          return (
            <section
              key={menu.name}
              className="m-2 p-2 text-xl font-semibold rounded flex items-center cursor-pointer hover:bg-black hover:text-white"
              onClick={() => handleSelect(menu.name, menu.route)}
            >
              <Icon
                className={`h-8 mr-2  ${
                  active === menu.name ? "" : "text-gray-400"
                }`}
              />
              <span className={active === menu.name ? "" : "text-gray-400"}>
                {menu.name}
              </span>
            </section>
          );
        })}
      </div>
      <div
        className="p-2 group cursor-pointer"
        onClick={() => {
          dispatch(logout());
          navigate('/');
        }}
      >
        <section className="m-2 p-2 text-xl rounded flex items-center group-hover:bg-orange-400 group-hover:text-white font-semibold">
          <LoginIcon className="h-8 mr-2" />
          <span>Log Out</span>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;

const menus = [
  {
    name: "Users",
    Icon: ViewGridIcon,
    route: "/users",
  },
  {
    name: "Items",
    Icon: ViewGridIcon,
    route: "/items",
  },
  {
    name: "Bookings",
    Icon: ViewGridIcon,
    route: "/bookings",
  },
  {
    name: "Orders",
    Icon: ViewGridIcon,
    route: "/orders",
  },
];
