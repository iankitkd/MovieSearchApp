import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {Loader} from "./index"
import { fetchMovieAll } from '../services/movieService';

export default function Carousel() {
    const region = useSelector((state) => state.userLocation.countryCode);
    const total = 5;
    const autoScrollInterval = 5000;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const handleLeftClick = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1) % total);
    }
    
    const handleRightClick = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await fetchMovieAll("now_playing", region);
            if(response && response.length > 0) {
              setMovies(response.slice(0, total));
            }
            setLoading(false);
          } catch (error) {
            console.error('Error fetching content data:', error);
            setLoading(false);
          }
        }
        fetchData();
    }, [])

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
    <>
    {!loading ?
        (<div className='relative w-full flex items-center max-w-5xl mx-auto overflow-hidden'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            
            <div className="flex w-full transition-transform duration-500"
              style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {movies.map((movie, index) => {
                return(
                  <div
                    key={movie.id}
                    className='w-full flex-shrink-0 relative'
                  >
                    {movie.backdrop_path && <img
                        className="object-cover w-full h-auto rounded-xl"
                        src={movie.backdrop_path}
                        alt={movie.title}
                      />
                    }

                    <div className="absolute inset-0 bg-black bg-opacity-30 text-white flex flex-col justify-end items-start">
                        <h3 className="text-xl font-bold p-1 mb-5 ml-5">{movie.title}</h3>
                    </div>
                  </div>
                )})}
            </div>                

            <button
                className="absolute left-1 z-10 bg-black bg-opacity-30 text-white p-2 md:p-3 rounded-full hover:bg-opacity-80"
                onClick={handleLeftClick}
            >
              <FaChevronLeft />
            </button>

            <button
                className="absolute right-1 z-10 bg-black bg-opacity-30 text-white p-2 md:p-3 rounded-full hover:bg-opacity-80"
                onClick={handleRightClick}
            >
              <FaChevronRight />
            </button>
        </div>
        ) : (
            <Loader />
        )
    }
    </>
  )
}
