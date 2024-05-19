import { useContext } from "react";
import { CartContext } from "../CartContext";

function useCart() {
    const { cartItems, totalItems, totalPrice, clearCart, removeItem } = useContext(CartContext);
    return { cartItems, totalItems, totalPrice, clearCart, removeItem };
}
export default useCart;

