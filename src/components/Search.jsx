"use client"

import { useState } from "react"
import React from "react";



const Search =({items}) =>{

const [value,setValue] =useState("")

const handleSearch = (e)=>{

    setValue(e.target.value)

}

    const filtered = items.filter((item)=>(

        item.name[0].toLowerCase().includes(value.toLowerCase())
    ))

return(

<>
    <div className="mr-4 ">
        <input 
        className="border-2 border-black"
        type="search" 
        name="search" 
        id="serach" 
        value={value}
        onChange={handleSearch}
        
        />

    </div>

    <div>
        
        
        {
        filtered.length > 0 ? (

        filtered.map((item,index)=>(
        
            <div key={index}
            className="flex gap-6">
            <h1>{item.name}</h1>
            <p>{item.price}</p>
            </div>
        ))
    ):(<h1>No items</h1>)

         }
    </div>

    </>
)

}

export default Search;