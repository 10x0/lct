let BASE = process.env.REACT_APP_API_BASE_URL;

export const API = {

  AUTH: {
    login:`${BASE}/ums/login`,
    register:`${BASE}/ums/register`,
    forgotPassword:`${BASE}/ums/forgotPassword`,
    resetPassword:`${BASE}/ums/resetPassword`,
    getProfile: `${BASE}/ums/self`,
    updateProfile: `${BASE}/ums/self/updateProfile`,
    changePassword: `${BASE}/ums/self/changePassword`,
    getAllUsers: `${BASE}/ums/admin/users`,
    crudUser: `${BASE}/ums/admin/user`
  },

  ITEM: {
    getAllItems: `${BASE}/ims/allItems`,
    getSingleItem: `${BASE}/ims/item`,
    addItem: `${BASE}/ims/admin/item/new`,
    editItem: `${BASE}/ims/admin/item`,
  },

  ORDER: {
    createOrder: `${BASE}/oms/createOrder`,
    getAllOrders: `${BASE}/oms/getAllOrders`,
  },

  BOOKING: {
    createBooking: `${BASE}/bms/createBooking`,
    getAllBookings: `${BASE}/bms/getAllBookings`,
  }
};