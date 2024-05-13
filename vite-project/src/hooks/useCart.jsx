import { useContext } from "react";
import { CartContext } from "../CartContext";

function useCart() {
    const { cartItems, totalItems, totalPrice } = useContext(CartContext);

    return { cartItems, totalItems, totalPrice };
}

export default useCart;

