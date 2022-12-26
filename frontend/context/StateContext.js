import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(0);

  // let foundProduct;

  // let index;

  const onAdd = (product, quantity) => {
    const productAlreadyInCart = cartItems.find(
      (item) => item._id === product._id
    );

    const checkProductSize = cartItems.find(
      (item) => item.size === product.size[size]
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price[size] * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (productAlreadyInCart && checkProductSize) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([
        ...cartItems,
        {
          ...product,
          size: product.size[size],
          price: product.price[size],
          uid: product._id + size,
        },
      ]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    const productFound = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.find((item) => item._id !== product._id);
    const checkSize = cartItems.filter((item) => item.size !== product.size);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - productFound.price * productFound.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - productFound.quantity
    );
    if (checkSize) {
      setCartItems(newCartItems);
    }
  };

  //Cart add button
  const onPlus = (product, quantity) => {
    //Total Price
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    //Increase total quantity
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    //Check if product is in the cart

    const updateItem = cartItems.find((item) => item.uid === product.uid);
    if (updateItem) {
      setCartItems(
        cartItems.map((item) =>
          item.uid === product.uid
            ? {
                ...updateItem,

                quantity: updateItem.quantity + quantity,
              }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  //Minus button in Cart
  const onMinus = (product) => {
    //Set Total Price
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);

    //Remove from total quantities
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);

    //Check if product exists

    const updateItem = cartItems.find((item) => item.uid === product.uid);

    if (updateItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.uid !== product.uid));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.uid === product.uid
            ? { ...updateItem, quantity: updateItem.quantity - 1 }
            : item
        )
      );
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,

        cartItems,
        totalPrice,
        totalQuantities,
        onPlus,
        onMinus,

        qty,
        incQty,
        decQty,
        onAdd,

        size,
        setSize,

        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
