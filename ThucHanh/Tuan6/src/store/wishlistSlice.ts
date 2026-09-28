import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  items: string[];
}

const initialState: WishlistState = {
  items: ["1", "3"],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((id) => id !== action.payload);
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      if (state.items.includes(action.payload)) {
        state.items = state.items.filter((id) => id !== action.payload);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
