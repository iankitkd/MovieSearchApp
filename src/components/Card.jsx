import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg"
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

import {TrailerModal, Rating} from "./index"

import { addToWatchlist, removeFromWatchlist, selectWatchlist } from '../store/slices/watchlistSlice';

export default function Card({content}) {
    var {id, title, image_path, media_type, vote_average} = content;
    
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const dispatch = useDispatch();
    const watchlist = useSelector(selectWatchlist);

    const isInWatchlist = watchlist.some(c => c.id === id);

    const location = useLocation();
    if(!media_type) {
        media_type = location.pathname.replace(/^\/+/, '');
    }

    const handleAddToWatchlist = () => {
        dispatch(addToWatchlist(content));
    }

    const handleRemoveFromWatchlist = () => {
        dispatch(removeFromWatchlist(id));
    }
    
  return (
    <div className='flex flex-col w-[160px] h-[320px] m-1 p-1 rounded-xl'>

        <Link to={`/${media_type}/${id}`}>
            <div className='w-[150px] h-[225px] relative hover:scale-105 duration-200'>
                <img 
                    src={image_path ? image_path : NoImagePlaceholder} alt={title}
                    className='w-full h-full object-cover rounded-xl'
                    loading="lazy"
                />

                <div 
                    className='absolute left-0 top-0 w-[30px] h-[35px] rounded-tl-xl flex items-center justify-center text-white bg-black bg-opacity-40 hover:bg-opacity-100'
                    onClick={(event) => {
                        event.preventDefault();
                        isInWatchlist ? handleRemoveFromWatchlist() : handleAddToWatchlist();
                    }}
                >
                    { 
                        isInWatchlist ? <BsBookmarkCheckFill className='w-[25px] h-[30px]' />
                            : <BsBookmarkPlus className='w-[25px] h-[30px]' />
                    }
                </div>

                <div className='absolute right-0 -bottom-3'>
                    <Rating rating={vote_average}/>
                </div>
            </div>

            <div className='pt-3 px-1 hover:text-accent-teal h-[60px] line-clamp-2'>
                {title}
            </div>

            <div className='flex flex-row justify-center items-center gap-1 text-text-secondary hover:text-text-primary hover:cursor-pointer' 
                onClick={(event) => {
                    event.preventDefault();
                    setIsTrailerOpen(true);
                }}
            >
                <FaPlay /> 
                <p>Trailer</p>
            </div>
        </Link>
        {isTrailerOpen && <TrailerModal id={id} media_type={media_type} closeTrailer={() => setIsTrailerOpen(false)} />}
    </div>
  )
}
