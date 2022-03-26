let BASE = process.env.REACT_APP_API_BASE_URL;
export const ApiConfig = {
  auth: `${BASE}/ums/login`,
  stripe: `${BASE}/checkout-session`,
  ORDER: {
    createOrder: `${BASE}/oms/createOrder`,
    getAllOrders: `${BASE}/oms/getAllOrders`,
  },
  ITEM: {
    getAllItems: `${BASE}/ims/allItems`,
    addItem: `${BASE}/ims/admin/item/new`,
  },
  HEADERS: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("_t")}`,
  },
};
