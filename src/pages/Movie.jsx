import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Tab, CardDisplay } from '../components';
import { fetchMovieAll } from '../services/movieService';
import { setMovieTab } from '../store/slices/currentTabSlice';

const movieTabs = ["Popular", "Top Rated", "Now Playing", "Upcoming"];

export default function Movie() {
    const dispatch = useDispatch();
    const region = useSelector((state) => state.userLocation.countryCode);
    const currentMTab = useSelector((state) => state.currentTab.movieTab);

    const [loading, setLoading] = useState(false);
    const [currentTab, setCurrentTab] = useState(currentMTab || movieTabs[0]);
    const [movieList, setMovieList] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const category = currentTab.toLowerCase().replace(/\s+/g, '_');
            const response = await fetchMovieAll(category, region);
            if(response && response.length > 0) {
              setMovieList(response);
            }
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        }
        fetchData();
    }, [currentTab, setCurrentTab])


  return (
    <div className='flex-grow text-text-primary flex flex-col items-center my-2'>

      <div className='flex flex-row items-center gap-4 mx-2 my-4'>
        <h2 className='text-xl font-bold'>
            Movie
        </h2>
        <Tab 
            tabItems={movieTabs} 
            currentTab={currentTab} 
            setCurrentTab={(tab) => {
              dispatch(setMovieTab(tab));
              setCurrentTab(tab);
            }}
        />
      </div>

      <div>
        <CardDisplay 
            cardData={movieList} 
            loading={loading} 
        />
      </div>

    </div>
  )
}
