import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { IoIosArrowRoundBack } from "react-icons/io";
import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg";

import { fetchPersonDetails } from '../services/personService';

export default function DetailPerson() {
    const [loading, setLoading] = useState(false);
    const [personDetails, setPersonDetails] = useState({});
    
    const {id} = useParams();
    const navigate = useNavigate();

    const maxLengthBio = 300;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchPersonDetails(id);
                if(response) {
                    setPersonDetails(response);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Person details:', error);
                setLoading(false);
            }
        }
        fetchData();
    }, [id])


    const renderContent = (details) => {
        const {id, name, profile_path, known_for_department, biography, gender, birthday, deathday, place_of_birth} = details;

        if (loading) {
            return (<div className="mx-auto p-6 text-xl">Loading...</div>)
        }
        if (Object.keys(details).length === 0) {
          return (<div className="mx-auto p-6 text-xl">No Content Found</div>)
        }

        return (
            <div className='flex flex-col px-2'>

                <section className='py-4'>
    
                    <div className='py-2 px-4'
                        onClick={() => navigate(-1)}
                    >
                        <IoIosArrowRoundBack className='text-text-secondary hover:text-text-contrast hover:-translate-x-1 transition-all duration-300 w-10 h-10' />
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-4 ml-1'>
                        <div className='md:w-[25%] max-w-[350px] max-h-[500px] flex flex-col'>
                            <img 
                                src={profile_path ? profile_path : NoImagePlaceholder} alt={name}
                                className='w-full h-full object-cover rounded-xl hover:scale-[1.03] transition-all duration-300'
                                loading="lazy"
                            />
                            <div></div>
                        </div>
        
                        <div className='md:w-[70%] flex flex-col p-2 text-lg'>
                            <h1 className='text-4xl font-bold py-2'>{name}</h1>
                            
                            <h2 className='text-2xl font-semibold pt-2'>Personal Info</h2>
                            <div className="grid grid-cols-3 w-[300px] md:w-[500px] px-1">
                                <span className="font-semibold">Known For</span>
                                <span className='col-span-2'>{known_for_department}</span>
                                
                                <span className="font-semibold">Gender</span>
                                <span className='col-span-2'>{gender}</span>
                                
                                <span className="font-semibold">Birthday</span>
                                <span className='col-span-2'>{birthday}</span>
                                
                                {deathday && (
                                    <>
                                    <span className="font-semibold">Deathday</span>
                                    <span className='col-span-2'>{deathday}</span>
                                    </>
                                )}
                                
                                <span className="font-semibold">Place Of Birth</span>
                                <span className='col-span-2'>{place_of_birth}</span>
                            </div>

                            <h2 className='text-2xl font-semibold pt-3'>Biography</h2>
                            <p className='px-1 transition-all duration-300'>
                                {isExpanded ? biography : biography.slice(0, maxLengthBio)}

                                <span className='ml-2 text-button-primary hover:text-button-hover hover:cursor-pointer' 
                                    onClick={toggleExpanded}
                                > 
                                    {!isExpanded ? (maxLengthBio < biography.length ? "Show More" : ""): "Show Less" }
                                </span>
                            </p>

                        </div>
                    </div>
                </section>
            </div>
        )
    }


  return (
    <div className='flex-grow text-text-primary'>
      {renderContent(personDetails)}
    </div>
  )
}
