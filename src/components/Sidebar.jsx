import React from 'react'
import { IoIosCart } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdOutlineChat } from "react-icons/md";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='fixed left-0 flex flex-col w-32 h-full gap-16 p-4 mt-10 top-20'>
      <Link to="/" className='flex items-center gap-2 font-bold hover:scale-105'><FaHome /> Home</Link>
      <Link to="/cart" className='flex items-center gap-2 font-bold hover:scale-105'><IoIosCart/> Cart</Link>
      <Link to="/ai" className='flex items-center gap-2 font-bold hover:scale-105'><MdOutlineChat/> AI Chat</Link>
    </div>
  )
}

export default Sidebar