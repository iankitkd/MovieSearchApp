import React, { useState, useRef, useCallback, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";

import {CardDisplay} from './index';

import debounce from '../utils/debounce';
import { fetchSearchContent } from '../services/movieService';

export default function SearchModal({closeModal}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const handleOutsideClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  }, [])

  const fetchData = async (query) => {
    try {
      setLoading(true);
      const response = await fetchSearchContent(query);
      if(response && response.length > 0) {
        setSearchResult(response);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trending content data:', error);
      setLoading(false);
    }
  }
  const debounceSearch = debounce(fetchData, 500);

  const searchHandler = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debounceSearch(value);
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className='fixed inset-0 z-50 flex flex-col bg-background bg-opacity-90 transition-all duration-300' 
        onClick={handleOutsideClick}>

      <div className='flex flex-row h-[64px] py-2 px-12 z-20 justify-center items-center gap-4 bg-background-dark bg-opacity-100 text-lg' 
        ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder='Search anything'
          value={searchQuery}
          onChange={searchHandler}
          autoFocus
          className='rounded-full w-5/6 md:w-2/3 px-2 py-1.5 bg-background-light focus:outline-none'
        />

        <button
          className="text-white text-4xl"
          onClick={closeModal}
        >
          <RxCross2 />
        </button>
      </div>

      <section className='overflow-y-auto scrollbar-none py-1'>
        {
          searchQuery && <CardDisplay 
            cardData={searchResult}
            loading={loading}
          /> 
        }
      </section>
    </div>
  )
}
