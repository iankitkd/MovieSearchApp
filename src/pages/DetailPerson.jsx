import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg";

import { Loader, NoContentFound } from '../components';
import { usePersonCreditedForQuery, usePersonDetailsQuery } from '../services/queries';

export default function DetailPerson() {
    const [knownFor, setKnownFor] = useState([]);
    const [isKnownForOpen, setIsKnownForOpen] = useState(false);
    const [knownForCategory, setKnownForCategory] = useState("Cast");
    
    const {id} = useParams();
    const navigate = useNavigate();

    const maxLengthBio = 400;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => setIsExpanded(!isExpanded);

    const {
        data: personDetails,
        isLoading,
    } = usePersonDetailsQuery(id);

    const {
        data: knownForData,
        isLoading: knownForLoading,
        refetch: fetchKnownFor,
        isFetched: isKnownForFetched,
    } = usePersonCreditedForQuery(id);

    
    useEffect(() => {
        if(knownForData && knownForData.updatedCastData && knownForData.updatedCastData.length > 0) {
            setKnownFor(knownForData.updatedCastData);
        }
    }, [knownForData])


    const handleKnownFor = () => {
        if(!isKnownForFetched) {
            fetchKnownFor();
        }
        setIsKnownForOpen((prev) => !prev);
    }

    const handleKnownForCategory = (category) => {
        setKnownForCategory(category);
        if(category == "Cast") {
            setKnownFor(knownForData.updatedCastData);
        } else if(category == "Crew") {
            setKnownFor(knownForData.updatedCrewData);
        }
    }


    const renderContent = (details) => {
        if (isLoading) {
            return (<Loader />)
        }
        if (Object.keys(details).length === 0) {
            return (<NoContentFound />)
        }

        const {id, name, profile_path, known_for_department, biography, gender, birthday, deathday, place_of_birth, external_ids} = details;
        const {facebook_id, instagram_id, twitter_id, youtube_id} = external_ids;

        return (
            <div className='flex flex-col px-2'>
                <section className='pb-4'>
    
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

                            {biography && (<>
                            <h2 className='text-2xl font-semibold pt-3'>Biography</h2>
                            <p className='px-1 transition-all duration-300'>
                                {isExpanded ? biography : biography.slice(0, maxLengthBio)}

                                <span className='ml-2 text-button-primary hover:text-button-hover hover:cursor-pointer' 
                                    onClick={toggleExpanded}
                                > 
                                    {!isExpanded ? (maxLengthBio < biography.length ? "Show More" : ""): "Show Less" }
                                </span>
                            </p>
                            </>)}

                        </div>
                    </div>
                </section>

                <section className='flex flex-col justify-center items-center py-2'>
                    <div className='flex items-center w-fit' onClick={handleKnownFor}>
                        <h2 className='text-2xl font-semibold p-3'>Known For</h2>
                        <button className='text-2xl font-semibold'>
                            {isKnownForOpen ? <FaCaretUp /> : <FaCaretDown />}
                        </button>
                    </div>

                    {isKnownForOpen && (
                        knownForLoading ? ( 
                            <Loader />
                    ) : knownFor.length == 0 ? ( 
                            <NoContentFound />
                    ) : ( <>
                    <div className='flex flex-row items-center h-5 gap-3'>
                        <button className={`${knownForCategory == "Cast" ? "text-accent-teal" : ""}`} onClick={() => handleKnownForCategory("Cast")}>Cast</button>
                        <button className={`${knownForCategory == "Crew" ? "text-accent-teal" : ""}`} onClick={() => handleKnownForCategory("Crew")}>Crew</button>
                    </div>
                    <div className='h-[500px] w-full md:w-[700px] bg-background-card overflow-y-scroll flex flex-col'>
                        {knownFor.map((ele, index) => (
                            <Link to={`/${ele.media_type}/${ele.id}`} key={index}>
                                <div className='h-[100px] w-full flex flex-row gap-3 px-2 mb-1'>
                                    <img 
                                        className="w-[70px] h-[100px]" 
                                        src={ele.image_path ? ele.image_path : NoImagePlaceholder} 
                                        alt="Poster" 
                                        loading='lazy'
                                    />
                                    <div className='flex flex-col justify-center hover:cursor-pointer'>
                                        <p className='font-semibold text-lg line-clamp-2'>{ele.title}</p>
                                        <p className='text-text-secondary line-clamp-1'>{ele.character ? `as ${ele.character}` : ""}</p>
                                        <p className='text-text-muted'>{ele.release_year == "0000" ? "" : ele.release_year}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    </>
                    ))}
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
