import React, { useState, useEffect } from 'react'

import { Tab, CardDisplay } from '../components';
import { fetchTvShowAll } from '../services/movieService';

const showTabs = ["Popular", "Top Rated", "On The Air", "Airing Today"];

export default function Tv() {
    const [loading, setLoading] = useState(false);
    const [currentTab, setCurrentTab] = useState(showTabs[0]);
    const [showList, setShowList] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const category = currentTab.toLowerCase().replace(/\s+/g, '_');
                const response = await fetchTvShowAll(category);
                if(response && response.length > 0) {
                    setShowList(response);
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
              Tv Shows
          </h2>
          <Tab 
              tabItems={showTabs} 
              currentTab={currentTab} 
              setCurrentTab={setCurrentTab} 
          />
        </div>
  
        <div>
          <CardDisplay 
              cardData={showList} 
              loading={loading} 
          />
        </div>
  
      </div>
    )
}
