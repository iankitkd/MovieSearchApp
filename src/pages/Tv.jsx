import React, { useState } from 'react'

import { Tab, CardDisplay } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setTvTab } from '../store/slices/currentTabSlice';
import { useTvShowsQuery } from '../services/queries';

const showTabs = ["Popular", "Top Rated", "On The Air", "Airing Today"];

export default function Tv() {
  const dispatch = useDispatch();
  const currentTTab = useSelector((state) => state.currentTab.tvTab);

  const [currentTab, setCurrentTab] = useState(currentTTab || showTabs[0]);

  const { data: showList, isLoading } = useTvShowsQuery(currentTab);


  return (
    <div className='flex-grow text-text-primary flex flex-col items-center my-2'>

      <div className='flex flex-row items-center gap-4 mx-2 my-4'>
        <h2 className='text-xl font-bold'>
          Tv Shows
        </h2>
        <Tab
          tabItems={showTabs}
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            dispatch(setTvTab(tab));
            setCurrentTab(tab);
          }}
        />
      </div>

      <div>
        <CardDisplay
          cardData={showList}
          isLoading={isLoading}
        />
      </div>

    </div>
  )
}
