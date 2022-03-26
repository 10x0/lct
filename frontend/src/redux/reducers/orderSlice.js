import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orderState",
  initialState: {
    orders: [],
    total: 0,
  },
  reducers: {
    addOrder: (state, { payload }) => {
      state.orders = [...state.orders, payload];
      state.total = calculateTotal(state.orders);
    },
    removeOrder: (state, { payload }) => {
      state.orders = removeItem([...state.orders], payload);
      state.total = calculateTotal(state.orders);
    },
  },
});

function calculateTotal(orders) {
  let total = 0;
  orders.forEach((o) => (total += o.price));
  return total;
}

function removeItem(orders, item) {
  let ord = orders.filter((o) => o._id !== item._id);
  return ord;
}

export const { addOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
