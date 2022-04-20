import Dashboard from "../pages/admin/Dashboard";
import ItemsPage from "../pages/admin/Items";
import Orders from "../pages/admin/Orders";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
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
    path: "/orders",
    title: "Order Items",
    component: OrdersPage,
    roles: ["customer"],
  },
  {
    path: "/",
    title: "Admin",
    component: Dashboard,
    roles: ["admin"],
  },
  {
    path: "/items",
    title: "Items",
    component: ItemsPage,
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
