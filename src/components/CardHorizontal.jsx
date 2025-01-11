import React from 'react'

import Card from './Card'

export default function CardHorizontal({cardData, loading}) {
  return (
    <div className='flex flex-row gap-4 overflow-x-auto overflow-y-hidden'>
        {
        loading ? (
            <div className='mx-auto p-6 text-xl'>
                Loading...
            </div>
        ) : (cardData.length > 0 ? (
            cardData.map((ele) => {
                return(
                    <Card 
                        key={ele.id} 
                        id={ele.id} 
                        title={ele.title} 
                        image_path={ele.image_path} 
                        media_type={ele.media_type} />
                )})
            ) : (
                <div className='mx-auto p-6 text-xl'>
                    No Content Found
                </div>
            )
        )
        }
    </div>
  )
}
