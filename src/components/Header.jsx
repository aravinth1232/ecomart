"use client"


// import { useState } from 'react';

import Image from 'next/image'
import logo from "../app/favicon.ico"
import Link from 'next/link'
import { FaShoppingCart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";






const Header = () => {

  // const [cartCount, setCartCount] = useState(1);


  return (
    
    
    <nav className='flex flex-row gap-4  items-center justify-between py-1 px-5
     '>
    
    <div>
    <Link href= "/">
    <Image 
    className='w-24 h-16 object-contain '
    src={logo} 
    priority
    alt='logo'
    />
    </Link>

    </div>

    <div className='flex flex-row gap-20 items-center justify-between' >
      <div className='flex flex-row gap-7 items-center justify-between '>        
      <Link
        href="/wishlist"
        className="flex items-center space-x-4">
      <p
        className="relative  py-2 px-4 rounded-lg text-2xl  transition duration-300"
        
      >
        <IoMdHeart 
        className='hover:opacity-80' />
      
          <span className="absolute -top-2 -right-0 bg-secondary text-primary rounded-full h-6 w-6 flex items-center justify-center text-sm">
            0
          </span>
      
      </p>
    </Link>

    <Link
        href="/cart"
        className="flex items-center space-x-4">
      <p
        className="relative bg-primary text-white text-2xl py-2 px-4 rounded-full  transition duration-300"
        
      >
        <FaShoppingCart className='hover:opacity-80' />
      
          <span className="absolute -top-2 -right-2 bg-secondary text-primary rounded-full h-6 w-6 flex items-center justify-center text-sm">
            0
          </span>
      
      </p>
    </Link>
    </div>
    <div>
    <Link
        href="/auth/loginuser"
        className="flex items-center space-x-4">
      <p
        className="relative bg-black text-primary p-2 text-3xl  rounded-full  transition duration-300"
        
      >
        <FaRegUserCircle  className='hover:opacity-80' />
      
      </p>
    </Link>
    </div>
 
    
    
    </div>

    </nav>
  )
}

export default Header
