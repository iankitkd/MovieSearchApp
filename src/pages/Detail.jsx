import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import { IoIosArrowRoundBack } from "react-icons/io";

import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg";
import fetchDetails from '../services/fetchDetails';
import { CardHorizontal, Loader, NoContentFound } from '../components';

export default function Detail() {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchDetails(path);
                if(response) {
                    setDetails(response);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching details:', error);
                setLoading(false);
            }
        }
        fetchData();
    }, [path])


    const renderContent = (details) => { 
      if (loading) {
        return (<Loader />)
      }
      if (Object.keys(details).length === 0) {
        return (<NoContentFound />)
      }
      
      const {id, title, poster_path, backdrop_path, overview, tagline, genres, release_date, runtime, cast, similars, recommendations} = details;
      
        return (
          <div className='flex flex-col px-2'>


            <section className='py-4 relative bg-cover'
              style={ backdrop_path && {
                backgroundImage: `url(${backdrop_path})`,
              }}>

              <div className="absolute inset-0 bg-black bg-opacity-75"></div>
              <div className='relative z-10 py-2 px-4'
                onClick={() => navigate(-1)}>
                <IoIosArrowRoundBack className='text-text-secondary hover:text-text-contrast hover:-translate-x-1 transition-all duration-300 w-10 h-10' />
              </div>
                
              <div className='relative z-10 flex flex-col md:flex-row gap-4 ml-1'>
                <div className='md:w-[25%] max-w-[375px] max-h-[550px] flex flex-col'>
                  <img 
                      src={poster_path ? poster_path : NoImagePlaceholder} alt={title}
                      className='w-full h-full object-cover rounded-xl hover:scale-[1.03] transition-all duration-300'
                      loading="lazy"
                  />
                  <div></div>
                </div>

                <div className='md:w-[70%] flex flex-col p-2 text-lg'>
                  <h1 className='text-4xl font-bold py-2'>{title}</h1>
                  <div className='flex flex-row'>
                      {genres.map((ele) => (
                          <span key={ele.id} className='border-r-2 border-text-secondary pr-2 mr-2'> {ele.name} </span>
                      ))}
                  </div>

                  {(release_date || runtime) && 
                  <div className=''>
                      <span className='pr-2'>{release_date}</span>
                      <span className='pr-2 font-bold text-2xl'>&#183;</span>
                      <span className='pr-2'>{runtime}</span>
                  </div>
                  }

                  <p className='py-2 italic text-text-secondary'>{tagline}</p>

                  <h2 className='text-2xl font-semibold'>Overview</h2>
                  <p className='leading-5'>{overview}</p>
                </div>
              </div>
            </section>

            {cast && cast.length > 0 && 
            <section className='py-2'>
              <h2 className='text-2xl font-semibold p-3'>Cast</h2>
              <CardHorizontal cardData={cast}/>
            </section>
            }

            {similars && similars.length > 0 && 
            <section className='py-2'>
              <h2 className='text-2xl font-semibold p-3'>Similars</h2>
              <CardHorizontal cardData={similars}/>
            </section>
            }

            {recommendations && recommendations.length > 0 && 
            <section className='py-2'>
              <h2 className='text-2xl font-semibold p-3'>Recommendations</h2>
              <CardHorizontal cardData={recommendations}/>
            </section>
            }

          </div>
        )
    }     
    

  return (
    <div className='flex-grow text-text-primary'>
        {renderContent(details)}
    </div>
  )
}
