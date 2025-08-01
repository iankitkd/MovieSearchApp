import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useMatch } from 'react-router-dom';
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

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
  {
    title: "Person",
    link: "/person"
  },
]

export default function Header({showHeaderOverlay = false}) {
  const { pathname } = useLocation();
  const isHomePage = useMatch('/');
  const isMovieDetailPage = useMatch('/movie/:id');
  const isTvShowDetailPage = useMatch('/tv/:id');

  const [isTransparent, setIsTransparent] = useState(showHeaderOverlay);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsTransparent((prev) => !prev);
  }

  useEffect(() => {
    if(isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  const isOverlayPage = isHomePage || isMovieDetailPage || isTvShowDetailPage;

  if(isOverlayPage && !showHeaderOverlay) {
    return null;
  } 

  return (
    <header className={`bg-background-dark text-text-primary flex gap-4 justify-around items-center p-2 ${showHeaderOverlay && 'absolute top-0 left-0 w-full z-50'} ${isTransparent && "bg-black/5"}`}>

      <div className='lg:hidden flex justify-center items-center w-1/6 text-xl'
        onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <RxCross2 /> : <FaBars />}
      </div>

      <div className='font-bold text-2xl w-1/2 lg:w-1/6'>
        <Link to="/" className="bg-gradient-to-r from-green-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
          CinePick
        </Link>
      </div>

      <div className='hidden lg:flex flex-row w-1/3'>
        {navLinks.map((ele, index) => {
          return (
            <NavLink
              key={index}
              to={ele.link}
              className={({ isActive }) =>
                `${isActive && pathname == ele.link
                  ? "text-accent-teal border-b-2 border-accent-teal font-bold"
                  : "hover:text-accent-teal"} mx-2 p-1`}
            >
              {ele.title}
            </NavLink>
          );
        })}
      </div>

      <div className='w-1/6 lg:w-1/4 flex flex-row items-center justify-center rounded-full lg:bg-background-light lg:px-3 py-1.5'>
        <input
          type="text"
          name='search'
          placeholder='Search anything'
          onClick={openModal} 
          className="hidden lg:block w-full bg-background-light focus:outline-none"
        />
        <button onClick={openModal} className="text-xl">
          <FaSearch />
        </button>
      </div>

      <div className='rounded-full h-8 w-8 m-2'>
        <Link to="/watchlist">
          <FaUserCircle className="w-full h-full" />
        </Link>
      </div>

      {isModalOpen && <SearchModal closeModal={closeModal} />}

      {isMobileMenuOpen && (
      <div className="lg:hidden absolute top-[64px] left-0 w-2/3 h-[calc(100vh-64px)] bg-background-dark opacity-95 z-50 transition-all duration-700 ease-in-out">
        <div className="flex flex-col items-center">
          {navLinks.map((ele, index) => (
            <NavLink
              key={index}
              to={ele.link}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
              className={({ isActive }) =>
                `${isActive && pathname === ele.link 
                  ? "text-accent-teal font-bold" 
                  : "hover:text-accent-teal"} py-2`
              }
            >
              {ele.title}
            </NavLink>
          ))}
        </div>
      </div>
    )}
      
    </header>
  )
}
