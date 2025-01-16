import React from 'react'

import { RxCross2 } from "react-icons/rx";

export default function TrailerModal({trailerPath, closeTrailer}) { 
    return (
        <div className='fixed inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-90 transition-all duration-300'>
    
            <div className='relative max-h-[calc(100vh-32px)] pb-[56.25%] lg:pb-0 lg:h-full w-full mx-2 mt-8'>
                <iframe
                    src={trailerPath} 
                    title="Movie Trailer"
                    className='absolute bottom-0 left-0 w-full h-full'
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
    
                <button
                    className="font-bold text-white hover:text-text-secondary text-3xl absolute -top-8 right-3"
                    onClick={closeTrailer}
                >
                    <RxCross2 />
                </button>
            </div>

        </div>
    )
}
