import React from 'react'
import { Link } from 'react-router-dom';

import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg"

export default function Card({id, title, image_path, media_type}) {
  return (
    <div className='flex flex-col w-[160px] h-[300px] m-2 p-1 rounded-xl hover:scale-105 duration-200'>

        <Link to={`/${media_type}/${id}`}>
            <div className='w-[150px] h-[225px]'>
                {
                    <img 
                        src={image_path ? image_path : NoImagePlaceholder} alt={title}
                        className='w-full object-cover rounded-xl'
                        loading="lazy"
                    />
                }

                {/* watchlist button */}
            </div>

            <div className='p-2 hover:text-accent-teal'>
                {title}
            </div>
        </Link>
    </div>
  )
}
