import React, { useEffect, useState } from 'react'

import { RxCross2 } from "react-icons/rx";

import {fetchTrailer} from '../services/movieDetailsService'
import {Loader} from './index';

export default function TrailerModal({id, media_type, closeTrailer}) { 
    const [trailerPath, setTrailerPath] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchTrailer(media_type, id);
                if(response) {
                    setTrailerPath(response);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trailer:', error);
                setLoading(false);
            }
        }
        fetchData();
    
        return () => {
            document.body.style.overflow = '';
        };
    }, []);


    const renderContent = () => {
        if(loading) {
            return <Loader />
        }

        return (
            <div className='relative max-h-[calc(100vh-32px)] pb-[56.25%] lg:pb-0 lg:h-full w-full mx-2 mt-8'>
                {trailerPath ? (
                    <iframe
                        src={trailerPath} 
                        title="Movie Trailer"
                        className='absolute bottom-0 left-0 w-full h-full'
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className='text-center text-xl font-bold'>No Trailer Found</div>
                )}
    
                <button
                    className="font-bold text-white hover:text-text-secondary text-3xl absolute -top-8 right-3"
                    onClick={closeTrailer}
                >
                    <RxCross2 />
                </button>
            </div>
        )
    }

    return (
        <div className='fixed inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-90 transition-all duration-300'>
            {renderContent()}
        </div>
    )
}
