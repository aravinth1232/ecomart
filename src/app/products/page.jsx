// // import Image from "next/image";
"use client"
// import { collection, getDocs, query, orderBy  } from "firebase/firestore";
// import { db } from "../../../firebase";
// import { useEffect, useState } from "react";

  

// export default function Home() {
//  const [items, setItems] = useState([]);
//   const [sortBy, setSortBy] = useState("name"); // State to track sorting field (name or price)
//   const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order (asc or desc)

//   // Function to fetch and sort data based on sortBy and sortOrder
//   const fetchItems = async () => {
//     const q = query(collection(db, "products"), orderBy(sortBy, sortOrder));

//     // Fetch the sorted documents
//     const querySnapshot = await getDocs(q);
//     const fetchedItems = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     // Set the fetched and sorted items in state
//     setItems(fetchedItems);
//   };

//   // Fetch items whenever sortBy or sortOrder changes
//   useEffect(() => {
//     fetchItems();
//   }, [sortBy, sortOrder]);

//   // Handle change in sorting field (name or price)
//   const handleSortByChange = (e) => {
//     setSortBy(e.target.value); // Update the sorting field (name or price)
//   };

//   // Handle change in sorting order (asc or desc)
//   const handleSortOrderChange = (e) => {
//     setSortOrder(e.target.value); // Update the sorting order (asc or desc)
//   };



//   return (
//     <>
//     <h1>Fetch data</h1>

//     {/* <select onChange={handleSortChange} value={sortOrder}>
//         <option value="asc">Sort Ascending (A-Z)</option>
//         <option value="desc">Sort Descending (Z-A)</option>
//       </select> */}

//       {/* Dropdown for sorting criteria (name or price) */}
//       <select onChange={handleSortByChange} value={sortBy}>
//         <option value="name">Sort by Name</option>
//         <option value="price">Sort by Price</option>
//       </select>

//       {/* Dropdown for sorting order (ascending or descending) */}
//       <select onChange={handleSortOrderChange} value={sortOrder}>
//         <option value="asc">Ascending</option>
//         <option value="desc">Descending</option>
//       </select>


//     <ul>
//         {items.map((item) => (
//           <li key={item.id}>
//             <h2>{`${item.name} , Rs.${item.price} `}</h2>
//             {/* <img src={item.imageurl} alt={item.name} width="200" /> */}
            
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseApp } from '../../../firebase'; // Adjust import as needed
import Link from "next/link"

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'shirts');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-5 py-6">
        {products.map(product => (
          <div key={product.id} className="shadow-md p-4  ">
            <Link href={`/products/${product.id}`}>
            <img 
            loading='lazy'
            src={product.image} alt={product.name} className="w-full  lg:h-48  object-contain" />
            </Link>
            <h2 className="text-lg font-bold capitalize">{product.name}  </h2>
            <p>Rs.{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
