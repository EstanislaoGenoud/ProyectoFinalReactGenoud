import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const addToCart = (item) =>{
        const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
        if(existingItemIndex !== -1){
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity++;
            setCartItems(updatedCartItems);
        }else {
            setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
        setTotalItems(totalItems + 1);
        setTotalPrice(totalPrice + item.price);
    };
    const removeItem = (itemId) =>{
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        const newTotalPrice = updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        setCartItems(updatedCartItems);
        setTotalItems(totalItems - 1);
        setTotalPrice(newTotalPrice);
    };
    const clearCart = () => {
        setCartItems([]);
        setTotalItems(0);
        setTotalPrice(0);
    };
    return (
        <CartContext.Provider
            value={{
                cartItems: cartItems,
                totalItems: totalItems,
                totalPrice: totalPrice,
                addToCart: addToCart,
                clearCart: clearCart,
                removeItem: removeItem
            }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider