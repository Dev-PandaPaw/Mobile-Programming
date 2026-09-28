import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addToCart, removeFromCart, updateQuantity } from "../store/cartSlice";
import { BOOKS } from "../data/data";

export function useCart() {
  const dispatch = useDispatch();
  const rawItems = useSelector((state: RootState) => state.cart.items);

  const items = rawItems.map((item) => {
    const book = BOOKS.find((b) => b.id === item.bookId);
    const rawPrice = book?.price || "0 đ";
    const priceNumber = parseInt(rawPrice.replace(/[^0-9]/g, ""), 10) || 0;
    return {
      id: item.bookId,
      bookId: item.bookId,
      title: book?.title || "Sách",
      price: rawPrice,
      priceNumber,
      image: book?.image || "",
      quantity: item.quantity,
      subtotal: priceNumber * item.quantity,
    };
  });

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => sum + item.subtotal, 0);

  const totalPriceFormatted = `${totalPrice.toLocaleString("vi-VN")} đ`;

  return {
    items,
    rawItems,
    totalQuantity,
    totalPrice,
    totalPriceFormatted,
    addToCart: (bookId: string) => dispatch(addToCart(bookId)),
    removeFromCart: (bookId: string) => dispatch(removeFromCart(bookId)),
    updateQuantity: (bookId: string, quantity: number) =>
      dispatch(updateQuantity({ bookId, quantity })),
  };
}
