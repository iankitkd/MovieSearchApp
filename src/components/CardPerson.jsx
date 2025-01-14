import React from 'react'
import { Link } from 'react-router-dom'

import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg"

export default function CardPerson({id, name, image_path, character, known_for_department}) {
  return (
    <div className='flex flex-col justify-center w-[160px] h-[300px] m-1 p-1 rounded-xl hover:scale-105 duration-200'>

        <Link to={`/person/${id}`}>
            <div className='w-[150px] h-[150px] rounded-full'>
                <img 
                    src={image_path ? image_path : NoImagePlaceholder} alt={name}
                    className='w-full h-full object-cover rounded-full'
                    loading="lazy"
                />

            </div>

            <div className='p-2 font-medium hover:text-accent-teal'>
                {(name.length > 32) ? name.substring(0, 32)+"..." : name}
            </div>
            <div className='px-2 text-text-secondary'>{character || known_for_department}</div>
        </Link>
    </div>
  )
}
