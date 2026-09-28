import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
} from "../store/wishlistSlice";
import { BOOKS } from "../data/data";

export function useWishlist() {
  const dispatch = useDispatch();
  const wishlistIds = useSelector((state: RootState) => state.wishlist.items);

  const items = BOOKS.filter((book) => wishlistIds.includes(book.id));

  const totalWishlist = wishlistIds.length;

  const isInWishlist = (bookId: string) => wishlistIds.includes(bookId);

  return {
    wishlistIds,
    items,
    totalWishlist,
    isInWishlist,
    addToWishlist: (bookId: string) => dispatch(addToWishlist(bookId)),
    removeFromWishlist: (bookId: string) =>
      dispatch(removeFromWishlist(bookId)),
    toggleWishlist: (bookId: string) => dispatch(toggleWishlist(bookId)),
  };
}
