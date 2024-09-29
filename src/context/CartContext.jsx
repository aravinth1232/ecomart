
"use client"
import { createContext, useState, useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, addDoc } from 'firebase/firestore';
import { firebaseApp } from '../../firebase';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  // Load cart from Firestore or localStorage based on user status
  useEffect(() => {
    const loadCart = async () => {
      const user = auth.currentUser;
      if (user) {
        // Load cart from Firestore for the logged-in user
        const cartCollectionRef = collection(db, 'users', user.uid, 'cart');
        const cartSnapshot = await getDocs(cartCollectionRef);
        const cartItemsData = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCartItems(cartItemsData);
      } else {
        // Load cart from localStorage for guest users
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
        // Save each item in the cart to Firestore under the user's collection
        const cartCollectionRef = collection(db, 'users', user.uid, 'cart');
        // Clear the existing cart collection
        const cartSnapshot = await getDocs(cartCollectionRef);
        cartSnapshot.forEach(async (docItem) => {
          await setDoc(doc(cartCollectionRef, docItem.id), {});
        });
        // Add items to cart collection
        cartItems.forEach(async (item) => {
          await addDoc(cartCollectionRef, item);
        });
      } else {
        // Save cart to localStorage for guest users
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
