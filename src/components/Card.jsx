import React from 'react'
import { Link } from 'react-router-dom';

import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg"

export default function Card({id, title, image_path, media_type}) {
  return (
    <div className='flex flex-col w-[160px] h-[300px] m-1 p-1 rounded-xl hover:scale-105 duration-200'>

        <Link to={`/${media_type}/${id}`}>
            <div className='w-[150px] h-[225px]'>
                {
                    <img 
                        src={image_path ? image_path : NoImagePlaceholder} alt={title}
                        className='w-full h-full object-cover rounded-xl'
                        loading="lazy"
                    />
                }

                {/* watchlist button */}
            </div>

            <div className='p-2 hover:text-accent-teal'>
                {(title.length > 32) ? title.substring(0, 32)+"..." : title}
            </div>
        </Link>
    </div>
  )
}
