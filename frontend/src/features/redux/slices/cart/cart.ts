import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, ICart } from "../../../../interfaces/productInterface";

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") ?? "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICart>) => {
      const newItem = action.payload;

      const existing = state.items.find((data) => data.id === newItem.id)
      if (existing && existing.quantity) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 })
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      state.items = state.items.filter((data) => data.id !== itemId)

      localStorage.setItem("cart", JSON.stringify(state.items))
    },
    updateQuantity: (state, action: PayloadAction<{ quantity: number; id: string }>) => {
      const { id, quantity } = action.payload;

      const exist = state.items.find((data) => data.id === id)
      if (exist && quantity > 0) {
        exist.quantity = quantity
      }

      localStorage.setItem("cart", JSON.stringify(state.items))
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions
export default cartSlice.reducer;
