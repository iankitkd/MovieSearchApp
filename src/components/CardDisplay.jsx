import React from 'react'

import {Card} from "./index"

export default function CardDisplay({cardData, loading}) {
  return (
    <div className='flex flex-row flex-wrap justify-center md:mx-4 md:gap-2'>
        { loading ? (
            <div className='mx-auto p-6 text-3xl'>
                Loading...
            </div>
        ) : ( 
            cardData.length > 0 ? (
            cardData.map((ele) => {
                return (
                <Card 
                    key={ele.id} 
                    id={ele.id} 
                    title={ele.title} 
                    image_path={ele.image_path} 
                    media_type={ele.media_type} 
                />)
            })
            ) : (
                <div className='mx-auto p-6 text-3xl'>
                    No Content Found
                </div>
            )
        )}
    </div>
  )
}
