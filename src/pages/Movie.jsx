import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Tab, CardDisplay } from '../components';
import { setMovieTab } from '../store/slices/currentTabSlice';
import { useMoviesQuery } from '../services/queries';

const movieTabs = ["Popular", "Top Rated", "Now Playing", "Upcoming"];

export default function Movie() {
  const dispatch = useDispatch();
  const region = useSelector((state) => state.userLocation.countryCode);
  const currentMTab = useSelector((state) => state.currentTab.movieTab);

  const [currentTab, setCurrentTab] = useState(currentMTab || movieTabs[0]);

  const { data: movieList, isLoading } = useMoviesQuery(currentTab, region);


  return (
    <div className='text-text-primary flex flex-col items-center my-2'>
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
          isLoading={isLoading}
        />
      </div>

    </div>
  )
}
