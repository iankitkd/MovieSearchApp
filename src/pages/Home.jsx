import React, { useState, useEffect } from 'react';

import {fetchTrendingAll} from '../services/movieService';
import {Card, Tab} from '../components';

const trendingTabs = ["Today", "This Week"];
const data = [
  {id: 0, title: "Title", image_path: "", media_type:"movie"}, {id: 1, title: "Title", image_path: ""}, {id: 2, title: "Title", image_path: ""}, {id: 3, title: "Title", image_path: ""}, 
  {id: 4, title: "Title", image_path: ""}, {id: 5, title: "Title", image_path: ""}, {id: 6, title: "Title", image_path: ""}, {id: 7, title: "Title", image_path: ""}, 
  {id: 8, title: "Title", image_path: ""}, {id: 9, title: "Title", image_path: ""}, {id: 10, title: "Title", image_path: ""}, {id: 11, title: "Title", image_path: ""}, 
  {id: 12, title: "Title", image_path: ""}, {id: 13, title: "Title", image_path: ""}, {id: 14, title: "Title", image_path: ""}, {id: 15, title: "Title", image_path: ""}, 
  {id: 16, title: "Title", image_path: ""}, {id: 17, title: "Title", image_path: ""}, {id: 18, title: "Title", image_path: ""}, {id: 19, title: "Title", image_path: ""}, 
]

export default function Home() {
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingWindow, setTrendingWindow] = useState(trendingTabs[0]);
  // const [trendingContent, setTrendingContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTrendingLoading(true);
        // const timeWindow = (trendingWindow == "Today") ? "day" : "week";
        // const response = await fetchTrendingAll(timeWindow);
        // if(response && response.length > 0) {
        //   setTrendingContent(response);
        // }
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

      <section></section>

      <section>
        <div className='flex flex-row items-center gap-4 m-4'>
          <h2 className='text-xl font-bold'>
            Trending
          </h2>
          <Tab tabItems={trendingTabs} currentTab={trendingWindow} setCurrentTab={setTrendingWindow} />
        </div>

        <div className='flex flex-row gap-4 overflow-x-auto overflow-y-hidden scrollbar
           scrollbar-thumb-background-card scrollbar-track-background scrollbar-thumb-rounded-full'>
          {
            trendingLoading ? (
            <div className='mx-auto p-6 text-xl'>
                Loading...
              </div>
            ) : (trendingContent.length > 0 ? (
              trendingContent.map((ele) => {
                  return(
                    <Card key={ele.id} id={ele.id} title={ele.title} image_path={ele.image_path} media_type={ele.media_type} />
                  )})
              ) : (<div className='mx-auto p-6 text-xl'>
                    No Content Found
                  </div>
              )
            )
          }
        </div>
      </section>

      <section></section>

    </div>
  )
}
