// pages/products/[id].js
"use client"// src/app/product/[id]/page.jsx
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '../../../../firebase'; // Adjust path if needed
import { useCart } from '@/context/CartContext';
// import { useRouter } from 'next/navigation';

const ProductDetailsPage = ({ params }) => {
  const { id } = params; // Get the product ID from params
  const [product, setProduct] = useState(null);
  const db = getFirestore(firebaseApp);
  const { addToCart } = useCart();
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'shirts', id));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() });
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-contain mt-4"
      />
      <p className="mt-4 text-xl font-semibold">${product.price}</p>
      {/* <p className="mt-2 text-gray-700">{product.description}</p> */}

      <button
        onClick={() => addToCart(product)}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailsPage;
