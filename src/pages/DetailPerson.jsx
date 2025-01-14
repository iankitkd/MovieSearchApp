import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { IoIosArrowRoundBack } from "react-icons/io";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg";

import { fetchPersonDetails } from '../services/personService';
import { Loader, NoContentFound } from '../components';

export default function DetailPerson() {
    const [loading, setLoading] = useState(false);
    const [personDetails, setPersonDetails] = useState({});
    
    const {id} = useParams();
    const navigate = useNavigate();

    const maxLengthBio = 400;
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
        if (loading) {
            return (<Loader />)
        }
        if (Object.keys(details).length === 0) {
            return (<NoContentFound />)
        }

        const {id, name, profile_path, known_for_department, biography, gender, birthday, deathday, place_of_birth, external_ids} = details;
        const {facebook_id, instagram_id, twitter_id, youtube_id} = external_ids;

        return (
            <div className='flex flex-col px-2'>

                <section className='py-4'>
    
                    <div className='py-2 px-4'
                        onClick={() => navigate(-1)}
                    >
                        <IoIosArrowRoundBack className='text-text-secondary hover:text-text-contrast hover:-translate-x-1 transition-all duration-300 w-10 h-10' />
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-4 ml-1 justify-center items-center md:items-start'>
                        <div className='md:w-[30%] lg:w-[25%] max-w-[350px] max-h-[530px] flex flex-col'>
                            <div className='h-[480px]'> 
                                <img 
                                    src={profile_path ? profile_path : NoImagePlaceholder} alt={name}
                                    className='w-full h-full object-cover rounded-xl hover:scale-[1.03] transition-all duration-300'
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-row justify-center gap-5 p-3">
                                {facebook_id && (
                                <a
                                    href={facebook_id}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link text-blue-600 hover:text-blue-800"
                                >
                                    <FaFacebook size={30} className="hover:scale-110 transition-all duration-300" />
                                </a>
                                )}
                                {twitter_id && (
                                <a
                                    href={twitter_id}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link text-blue-400 hover:text-blue-600"
                                >
                                    <FaTwitter size={30} className="hover:scale-110 transition-all duration-300" />
                                </a>
                                )}
                                {instagram_id && (
                                <a
                                    href={instagram_id}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link text-pink-600 hover:text-pink-800"
                                >
                                    <FaInstagram size={30} className="hover:scale-110 transition-all duration-300" />
                                </a>
                                )}
                                {youtube_id && (
                                <a
                                    href={youtube_id}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link text-red-600 hover:text-red-800"
                                >
                                    <FaYoutube size={30} className="hover:scale-110 transition-all duration-300" />
                                </a>
                                )}
                            </div>
                        </div>
        
                        <div className='md:w-[70%] flex flex-col px-2 text-lg'>
                            <h1 className='text-4xl font-bold'>{name}</h1>
                            
                            <h2 className='text-2xl font-semibold pt-2'>Personal Info</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 w-full md:w-[500px] px-1">
                                <span className="font-semibold">Known For</span>
                                <span className='md:col-span-2'>{known_for_department}</span>
                                
                                <span className="font-semibold">Gender</span>
                                <span className='md:col-span-2'>{gender}</span>
                                
                                <span className="font-semibold">Birthday</span>
                                <span className='md:col-span-2'>{birthday}</span>
                                
                                {deathday && (
                                    <>
                                    <span className="font-semibold">Deathday</span>
                                    <span className='md:col-span-2'>{deathday}</span>
                                    </>
                                )}
                                
                                <span className="font-semibold">Place Of Birth</span>
                                <span className='md:col-span-2'>{place_of_birth}</span>
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
