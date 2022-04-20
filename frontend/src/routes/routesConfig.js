import Bookings from "../pages/admin/Bookings";
import ItemsPage from "../pages/admin/Items";
import Orders from "../pages/admin/Orders";
import Users from "../pages/admin/Users";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ResetPasswordPage from "../pages/auth/ResetPassword";
import BookTable from "../pages/booking";
import Homepage from "../pages/customer/home";
import Items from "../pages/customer/items";
import OrdersPage from "../pages/customer/orders";

const routesConfig = [
  {
    path: "/",
    title: "Home",
    component: Homepage,
    roles: ["all"],
  },
  {
    path: "/menu",
    title: "Menu",
    component: Items,
    roles: ["all","customer"],
  },
  {
    path: "/book",
    title: "Book",
    component: BookTable,
    roles: ["all","customer"],
  },
  {
    path: "/login",
    title: "Sign In",
    component: LoginPage,
    roles: [],
  },
  {
    path: "/register",
    title: "Register",
    component: RegisterPage,
    roles: [],
  },
  {
    path: "/forgotPassword",
    title: "Forgot Password",
    component: ForgotPasswordPage,
    roles: [],
  },
  {
    path: "/resetPassword/:token",
    title: "Reset Password",
    component: ResetPasswordPage,
    roles: [],
  },
  {
    path: "/orders",
    title: "Order Items",
    component: OrdersPage,
    roles: ["customer"],
  },
  {
    path: "/users",
    title: "Users",
    component: Users,
    roles: ["admin"],
  },
  {
    path: "/items",
    title: "Items",
    component: ItemsPage,
    roles: ["admin"],
  },
  {
    path: "/bookings",
    title: "Bookings",
    component: Bookings,
    roles: ["admin"],
  },
  {
    path: "/orders",
    title: "Orders",
    component: Orders,
    roles: ["admin"],
  },
];

export default routesConfig;
