"use client"

import { useCart } from '@/context/CartContext';

import React from 'react'

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="mt-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 mb-4">
              <img 
              className="w-full h-64 object-contain mt-4"
              loading='lazy'
              src={item.image} alt={item.name} />
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p>${item.price}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;