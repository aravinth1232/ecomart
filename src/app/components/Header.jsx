import React from 'react'
import Image from 'next/image'
import logo from "../assets/Ecomart.png"
import Link from 'next/link'

const Header = () => {
  return (
    <nav>
    
    <div>
    <Link href= "/">
    <Image 
    className='w-16'
    src={logo} 
    priority
    alt='logo'
    />
    </Link>
    </div>


    </nav>
  )
}

export default Header
