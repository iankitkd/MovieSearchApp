import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg"
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";

import { addToWatchlist, removeFromWatchlist, selectWatchlist } from '../store/slices/watchlistSlice';

export default function Card({id, title, image_path, media_type}) {
    const content =  {id, title, image_path, media_type};
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
    <div className='flex flex-col w-[160px] h-[300px] m-1 p-1 rounded-xl hover:scale-105 duration-200'>

        <Link to={`/${media_type}/${id}`}>
            <div className='w-[150px] h-[225px] relative'>
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
            </div>

            <div className='p-2 hover:text-accent-teal'>
                {(title.length > 32) ? title.substring(0, 32)+"..." : title}
            </div>
        </Link>
    </div>
  )
}
