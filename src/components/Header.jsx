import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

import { SearchModal } from './index';

const navLinks = [
  {
    title: "Home",
    link: "/"
  },
  {
    title: "Movies",
    link: "/movie"
  },
  {
    title: "TV Shows",
    link: "/tv"
  },
]

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className='bg-background-dark text-text-primary flex gap-4 justify-around items-center p-2'>

      <div className='font-bold text-2xl w-1/6'>
        <Link to="/">
          CinePick
        </Link>
      </div>

      <div className='flex flex-row w-1/3'>
        {navLinks.map((ele, index) => {
          return (
            <div key={index} className='mx-2 p-1'>
              <NavLink
                to={ele.link}
                className={({ isActive }) =>
                  isActive
                    ? "text-accent-teal border-b-2 border-accent-teal font-bold"
                    : "hover:text-accent-teal"}
              >
                {ele.title}
              </NavLink>
            </div>
          );
        })}
      </div>

      <div className='w-1/4'>
        <input
          type="text"
          placeholder='Search anything'
          onClick={openModal} 
          className="w-full rounded-full px-4 py-1.5 bg-background-light focus:outline-none"
        />
      </div>

      <div className='rounded-full h-8 w-8 m-2'>
        <Link to="/watchlist">
          <FaUserCircle className="w-full h-full" />
        </Link>
      </div>

      {isModalOpen && <SearchModal closeModal={closeModal} />}
      
    </header>
  )
}
