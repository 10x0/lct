import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import orderReducer from "./reducers/orderSlice";

export default configureStore({
  reducer: {
    authState: authReducer,
    orderState: orderReducer,
  },
});
