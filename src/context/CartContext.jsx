
"use client"
// src/context/CartContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  // Load cart from localStorage or Firestore based on user status
  useEffect(() => {
    const loadCart = async () => {
      const user = auth.currentUser;
      if (user) {
        // Load cart from Firestore
        const cartDoc = await getDoc(doc(db, 'users', user.uid, 'cart', 'cartData'));
        if (cartDoc.exists()) {
          setCartItems(cartDoc.data().items || []);
        }
      } else {
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }
    };

    loadCart();
  }, [auth.currentUser, db]);

  // Save cart to Firestore or localStorage whenever cartItems change
  useEffect(() => {
    const saveCart = async () => {
      const user = auth.currentUser;
      if (user) {
        // Save cart to Firestore
        await setDoc(doc(db, 'users', user.uid, 'cart', 'cartData'), {
          items: cartItems,
        });
      } else {
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    };

    saveCart();
  }, [cartItems, auth.currentUser, db]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
