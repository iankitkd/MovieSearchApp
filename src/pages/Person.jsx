import React, { useState, useEffect } from 'react'

import { CardDisplay } from '../components'
import { fetchPersonPopular } from '../services/personService';

export default function Person() {
  const [loading, setLoading] = useState(false);
  const [personList, setPersonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchPersonPopular();
        if(response && response.length > 0) {
          setPersonList(response);
        }
        console.log(response)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [])
  


  return (
    <div className='flex-grow text-text-primary flex flex-col items-center my-2'>

      <div className='flex flex-row items-center gap-4 mx-2 my-4'>
        <h2 className='text-xl font-bold'>
            Popular Person
        </h2>
      </div>

      <div>
        <CardDisplay 
            cardData={personList} 
            loading={loading} 
        />
      </div>
    </div>
  )
}
