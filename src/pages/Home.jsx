import React, { useState } from 'react';

import {CardHorizontal, Carousel, Tab} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setTrendingTab } from '../store/slices/currentTabSlice';
import { useMoviesQuery, useTrendingQuery, useTvShowsQuery } from '../services/queries';

const trendingTabs = ["Today", "This Week"];

export default function Home() {
  const dispatch = useDispatch();
  const currentTTab = useSelector((state) => state.currentTab.trendingTab);

  const [trendingWindow, setTrendingWindow] = useState(currentTTab || trendingTabs[0]);
  // const [trendingLoading, setTrendingLoading] = useState(false);
  // const [trendingContent, setTrendingContent] = useState([]);

  const {
    data: trendingContent, 
    isLoading: trendingLoading, 
  } = useTrendingQuery(trendingWindow);

  const {
    data: popularMovies, 
    isLoading: isMoviesLoading, 
  } = useMoviesQuery("popular");

  const {
    data: popularTvShows, 
    isLoading: isTvShowsLoading, 
  } = useTvShowsQuery("popular");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setTrendingLoading(true);
  //       const timeWindow = (trendingWindow == "Today") ? "day" : "week";
  //       const response = await fetchTrendingAll(timeWindow);
  //       if(response && response.length > 0) {
  //         setTrendingContent(response);
  //       }
  //       setTrendingLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching trending content data:', error);
  //       setTrendingLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, [trendingWindow, setTrendingWindow])
  

  return (
    <div className='flex-grow text-text-primary'>

      <section className=''>
        <Carousel />
      </section>

      {/* trending section */}
      <section className='mt-8 px-1 md:px-4'>
        <div className='flex flex-row items-center gap-4 m-4'>
          <h2 className='text-xl font-bold'>
            Trending
          </h2>
          <Tab 
            tabItems={trendingTabs} 
            currentTab={trendingWindow} 
            setCurrentTab={(tab) => {
              dispatch(setTrendingTab(tab));
              setTrendingWindow(tab);
            }}
          />
        </div>

        <CardHorizontal 
          cardData={trendingContent} 
          isLoading={trendingLoading}
        />
      </section>

      {/* popular movies section */}
      <section className='mt-16 px-1 md:px-4'>
        <div className='flex flex-row items-center gap-4 m-4'>
          <h2 className='text-xl font-bold'>
            Popular Movies
          </h2>
        </div>

        <CardHorizontal 
          cardData={popularMovies} 
          isLoading={isMoviesLoading}
          showLoader={false}
        />
      </section>

      {/* popular tv shows section */}
      <section className='mt-16 px-1 md:px-4'>
        <div className='flex flex-row items-center gap-4 m-4'>
          <h2 className='text-xl font-bold'>
            Popular Tv Shows
          </h2>
        </div>

        <CardHorizontal 
          cardData={popularTvShows} 
          isLoading={isTvShowsLoading}
          showLoader={false}
        />
      </section>

    </div>
  )
}
