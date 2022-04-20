import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MenuAlt3Icon, LogoutIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/authSlice";
import logo from "../assets/images/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated } = useSelector((state) => state.authState);
  const { orders } = useSelector((state) => state.orderState);

  const tryLogginout = () => {
    localStorage.removeItem("_t");
    dispatch(logout());
  };

  return (
    <header className="flex md:justify-between m-2 md:m-3">
      <Link to="/" className="select-none text-4xl flex-grow md:flex-grow-0">
        <img width="100px" src={logo} alt="logo" />
      </Link>
      
      {authenticated ? (
        <aside className="mb-2 md:flex md:mb-4">
          <div
            className="relative flex ml-2 items-center rounded-xl bg-gray-100 hover:bg-gray-200 p-2 cursor-pointer"
            onClick={() => navigate("/orders")}
          >
            {orders.length > 0 && (
              <span className="absolute w-3 h-3 top-0 right-0 bg-red-500 rounded-full animate-pulse"></span>
            )}
            My Orders
          </div>
          <div
            className="flex ml-2 items-center rounded-xl bg-gray-100 hover:bg-gray-200 p-2 cursor-pointer"
            onClick={tryLogginout}
          >
            <LogoutIcon className="h-8 text-gray-600" />
          </div>
        </aside>
      ) : (
        <>
          <div className="flex ml-2 md:hidden items-center rounded-xl bg-gray-100 p-2 mb-2 md:mb-4">
            <MenuAlt3Icon className="h-8 text-gray-600" />
          </div>
          <aside className="hidden md:flex mb-4">
            <button
              className="mx-4 px-4 border-2 border-orange-500 rounded hover:bg-orange-200"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </aside>
        </>
      )}
    </header>
  );
};

export default Header;
