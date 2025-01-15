import React, { useState, useEffect } from 'react';

import {fetchTrendingAll} from '../services/movieService';
import {CardHorizontal, Carousel, Tab} from '../components';

const trendingTabs = ["Today", "This Week"];

export default function Home() {
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingWindow, setTrendingWindow] = useState(trendingTabs[0]);
  const [trendingContent, setTrendingContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTrendingLoading(true);
        const timeWindow = (trendingWindow == "Today") ? "day" : "week";
        const response = await fetchTrendingAll(timeWindow);
        if(response && response.length > 0) {
          setTrendingContent(response);
        }
        setTrendingLoading(false);
      } catch (error) {
        console.error('Error fetching trending content data:', error);
        setTrendingLoading(false);
      }
    }
    fetchData();
  }, [trendingWindow, setTrendingWindow])
  

  return (
    <div className='flex-grow text-text-primary'>

      <section className=''>
        <Carousel />
      </section>

      <section>
        <div className='flex flex-row items-center gap-4 m-4'>
          <h2 className='text-xl font-bold'>
            Trending
          </h2>
          <Tab 
            tabItems={trendingTabs} 
            currentTab={trendingWindow} 
            setCurrentTab={setTrendingWindow} 
          />
        </div>

        <CardHorizontal 
          cardData={trendingContent} 
          loading={trendingLoading}
        />
      </section>

      <section></section>

    </div>
  )
}
