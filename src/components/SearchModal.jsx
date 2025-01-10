import React, { useState, useRef } from 'react'
import { RxCross2 } from "react-icons/rx";

import {Card} from './index';

import debounce from '../utils/debounce';
import { fetchSearchContent } from '../services/movieService';

const data = [
  {id: 0, title: "Title", image_path: "", media_type:"movie"}, {id: 1, title: "Title", image_path: ""}, {id: 2, title: "Title", image_path: ""}, {id: 3, title: "Title", image_path: ""}, 
  {id: 4, title: "Title", image_path: ""}, {id: 5, title: "Title", image_path: ""}, {id: 6, title: "Title", image_path: ""}, {id: 7, title: "Title", image_path: ""}, 
  {id: 8, title: "Title", image_path: ""}, {id: 9, title: "Title", image_path: ""}, {id: 10, title: "Title", image_path: ""}, {id: 11, title: "Title", image_path: ""}, 
  {id: 12, title: "Title", image_path: ""}, {id: 13, title: "Title", image_path: ""}, {id: 14, title: "Title", image_path: ""}, {id: 15, title: "Title", image_path: ""}, 
  {id: 16, title: "Title", image_path: ""}, {id: 17, title: "Title", image_path: ""}, {id: 18, title: "Title", image_path: ""}, {id: 19, title: "Title", image_path: ""}, 
  {id: 12, title: "Title", image_path: ""}, {id: 13, title: "Title", image_path: ""}, {id: 14, title: "Title", image_path: ""}, {id: 15, title: "Title", image_path: ""}, 
  {id: 16, title: "Title", image_path: ""}, {id: 17, title: "Title", image_path: ""}, {id: 18, title: "Title", image_path: ""}, {id: 19, title: "Title", image_path: ""}, 
]

export default function SearchModal({closeModal}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // const [searchResult, setSearchResult] = useState(data);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  }

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

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debounceSearch(value);
  }

  return (
    <div className='fixed inset-0 z-10 flex flex-col bg-background bg-opacity-90' 
        onClick={handleOutsideClick}>

      <div className='flex flex-row h-[64px] py-2 px-12 z-20 justify-center items-center gap-4 bg-background-dark bg-opacity-100 text-lg' 
        ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder='Search anything'
          value={searchQuery}
          onChange={searchHandler}
          autoFocus
          className='rounded-full w-2/3 px-4 py-1.5 bg-background-light focus:outline-none'
        />

        <button
          className="text-white text-4xl"
          onClick={closeModal}
        >
          <RxCross2 />
        </button>
      </div>

      <section className='overflow-y-auto scrollbar-none py-1'>
        {searchQuery && ( 
          <div className='flex flex-row flex-wrap justify-center md:gap-2'>
            { loading ? (
              <div className='mx-auto p-6 text-xl'>
                  Loading...
              </div>
          ) : ( 
            searchResult.length > 0 ? (
              searchResult.map((ele) => {
                return (
                  <Card key={ele.id} id={ele.id} title={ele.title} image_path={ele.image_path} media_type={ele.media_type} />
                )
              })
            ) : (
              <div className='mx-auto p-6 text-xl'>
                    No Content Found
              </div>
            )
          )}
          </div>
        )}
      </section>
    </div>
  )
}
