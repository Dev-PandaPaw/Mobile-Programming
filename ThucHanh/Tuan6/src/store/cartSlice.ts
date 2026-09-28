import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItemState {
  bookId: string;
  quantity: number;
}

export interface CartState {
  items: CartItemState[];
}

const initialState: CartState = {
  items: [
    { bookId: "1", quantity: 1 },
    { bookId: "2", quantity: 2 },
    { bookId: "4", quantity: 1 },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const existing = state.items.find((i) => i.bookId === action.payload);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ bookId: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ bookId: string; quantity: number }>,
    ) => {
      const { bookId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.bookId !== bookId);
      } else {
        const item = state.items.find((i) => i.bookId === bookId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
