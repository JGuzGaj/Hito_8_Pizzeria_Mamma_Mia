import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    const existingPizza = cart.find((item) => item.id === pizza.id);

    if (existingPizza) {
      setCart(
        cart.map((item) =>
          item.id === pizza.id
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...pizza, count: 1 }]);
    }
  };

  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  const decrease = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
const clearCart = () => {
  setCart([]);
};
  return (
    <CartContext.Provider
  value={{ cart, addToCart, increase, decrease, total, clearCart }}
>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);