import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IoIosArrowRoundBack } from "react-icons/io";
import { FaPlay, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";

import NoImagePlaceholder from "../assets/NoImagePlaceholder.jpg";
import { addToWatchlist, removeFromWatchlist, selectWatchlist } from '../store/slices/watchlistSlice';

import { CardHorizontal, Loader, NoContentFound, TrailerModal, Rating, Header } from '../components';
import { useDetailsQuery, useRecommendationsQuery, useSimilarsQuery } from '../services/queries';

export default function Detail() {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  const [isSimilarsOpen, setIsSimilarsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [f, media_type, content_id] = path.split("/");

  const dispatch = useDispatch();
  const watchlist = useSelector(selectWatchlist);

  const [content, setContent] = useState({});
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const {
    data: details,
    isLoading,
    isSuccess
  } = useDetailsQuery(media_type, content_id);

  const {
    data: recommendations,
    isLoading: recommendationsLoading,
    refetch: fetchRecommendations,
    isFetched: isRecommendationsFetched
  } = useRecommendationsQuery(media_type, content_id);

  const {
    data: similars,
    isLoading: similarsLoading,
    refetch: fetchSimilars,
    isFetched: isSimilarsFetched
  } = useSimilarsQuery(media_type, content_id);


  const handleRecommendations = () => {
    if (!isRecommendationsFetched) {
      fetchRecommendations();
    }
    setIsRecommendationsOpen((prev) => !prev);
  }
  const handleSimilars = () => {
    if (!isSimilarsFetched) {
      fetchSimilars();
    }
    setIsSimilarsOpen((prev) => !prev);
  }

  const handleAddToWatchlist = () => {
    setIsInWatchlist(true);
    dispatch(addToWatchlist(content));
  }

  const handleRemoveFromWatchlist = () => {
    setIsInWatchlist(false);
    dispatch(removeFromWatchlist(content.id));
  }


  useEffect(() => {
    if (isSuccess && details) {
      const { id, title, poster_path, vote_average } = details;
      setContent({ id, title, image_path: poster_path, media_type, vote_average });
      setIsInWatchlist(watchlist.some(c => c.id === id));
    }
  }, [isSuccess, details]);


  const renderContent = (details) => {
    if (isLoading) {
      return (<Loader />)
    }
    if (Object.keys(details).length === 0) {
      return (<NoContentFound />)
    }

    const { id, title, poster_path, backdrop_path, overview, tagline, genres, release_date, runtime, vote_average, cast } = details;

    return (
      <div className='flex flex-col px-2'>


        <section className='py-4 relative bg-cover'
          style={backdrop_path ? {
            backgroundImage: `url(${backdrop_path})`
          } : undefined}
        >
          <Header showHeaderOverlay={true} />

          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className='relative z-10 py-2 px-4 mt-10'>
            <IoIosArrowRoundBack className='text-text-secondary hover:text-text-contrast hover:-translate-x-1 transition-all duration-300 w-10 h-10'
              onClick={() => navigate(-1)} />
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

              <div className='flex flex-row items-center gap-5 py-1'>
                <div><Rating rating={vote_average} /></div>

                <div className='w-[30px] h-[35px] flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-100 hover:cursor-pointer hover:scale-105'
                  onClick={isInWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist}
                >
                  {
                    isInWatchlist ? <BsBookmarkCheckFill className='w-[25px] h-[30px]' />
                      : <BsBookmarkPlus className='w-[25px] h-[30px]' />
                  }
                </div>

                <span className='flex flex-row items-center gap-1 w-fit hover:text-text-secondary hover:cursor-pointer'
                  onClick={() => setIsTrailerOpen(true)}
                >
                  <FaPlay />
                  <p>Watch Trailer</p>
                </span>
              </div>

              {isTrailerOpen && <TrailerModal id={id} media_type={media_type} closeTrailer={() => setIsTrailerOpen(false)} />}

              <p className='py-2 italic text-text-secondary'>{tagline}</p>

              <h2 className='text-2xl font-semibold'>Overview</h2>
              <p className='leading-5'>{overview}</p>
            </div>
          </div>
        </section>

        {cast && cast.length > 0 &&
          <section className='py-2'>
            <h2 className='text-2xl font-semibold p-3'>Cast</h2>
            <CardHorizontal cardData={cast} type="person" />
          </section>
        }

        <section className='pt-2'>
          <div className='flex items-center w-fit' onClick={handleSimilars}>
            <h2 className='text-2xl font-semibold p-3'>Similars</h2>
            <button className='text-2xl font-semibold'>
              {isSimilarsOpen ? <FaCaretUp /> : <FaCaretDown />}
            </button>
          </div>
          {isSimilarsOpen &&
            <CardHorizontal cardData={similars} isLoading={similarsLoading} />
          }
        </section>

        <section className='pt-2'>
          <div className='flex items-center w-fit' onClick={handleRecommendations}>
            <h2 className='text-2xl font-semibold p-3'>Recommendations</h2>
            <button className='text-2xl font-semibold'>
              {isRecommendationsOpen ? <FaCaretUp /> : <FaCaretDown />}
            </button>
          </div>
          {isRecommendationsOpen &&
            <CardHorizontal cardData={recommendations} isLoading={recommendationsLoading} />
          }
        </section>

      </div>
    )
  }


  return (
    <div className='flex-grow text-text-primary'>
      {renderContent(details)}
    </div>
  )
}
