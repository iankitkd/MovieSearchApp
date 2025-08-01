import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Header } from "./index"
import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg"

import { useMoviesQuery } from '../services/queries';

export default function Carousel() {
  const region = useSelector((state) => state.userLocation.countryCode);

  const { data: movies, isLoading } = useMoviesQuery("now_playing", region);

  const total = 5;
  const autoScrollInterval = 5000;

  const [currentIndex, setCurrentIndex] = useState(0);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % total);
  }

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleRightClick();
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [currentIndex]);


  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const swipeThreshold = 50;

    if (distance > swipeThreshold) {
      handleRightClick();
    } else if (distance < -swipeThreshold) {
      handleLeftClick();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };


  return (
    <div className='relative w-screen aspect-video max-h-dvh'>

      <Header showHeaderOverlay={true} />

      { !isLoading ?
      (<div className='absolute inset-0 flex items-center mx-auto overflow-hidden'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        <div className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className='w-full h-full flex-shrink-0 relative'
            >
              {<img
                className="h-full w-full object-cover rounded-xl"
                src={movie.backdrop_path ?? NoImagePlaceholder}
                alt={movie.title}
              />
              }

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-xl md:text-3xl text-white font-bold">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <button
          className="hidden sm:block absolute left-2 md:left-4 z-20 bg-black/30 text-white p-2 md:p-3 rounded-full hover:bg-opacity-80"
          onClick={handleLeftClick}
        >
          <FaChevronLeft />
        </button>

        <button
          className="hidden sm:block absolute right-2 md:right-4 z-20 bg-black bg-opacity-30 text-white p-2 md:p-3 rounded-full hover:bg-opacity-80"
          onClick={handleRightClick}
        >
          <FaChevronRight />
        </button>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {Array.from({ length: total }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 w-2 md:w-3 md:h-3 rounded-full transition-all ${
                idx === currentIndex ? 'bg-white scale-110' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      ) : (
        <div className='h-full w-full'>
        </div>
      ) }
    </div>
  )
}