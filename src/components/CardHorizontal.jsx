import React, { useState } from 'react'

import {Card, LoaderMovingBar, NoContentFound} from './index'

export default function CardHorizontal({cardData, loading}) {
    const [visibleCount, setVisibleCount] = useState(20);

    const showMoreCards = () => {
        setVisibleCount((prevCount) => prevCount + 20);
    };

    const renderContent = () => {
        if(loading) {
            return (<LoaderMovingBar />)
        }

        if(cardData.length == 0) {
            return (<NoContentFound />)
        }

        return (
            <>
            {cardData.slice(0, visibleCount).map((ele) => {
                return(
                    <Card 
                        key={ele.id} 
                        id={ele.id} 
                        title={ele.title} 
                        image_path={ele.image_path} 
                        media_type={ele.media_type} />
                )})
            }
            {visibleCount < cardData.length &&
                (<div className='flex justify-center items-center mt-2 min-w-[150px] max-h-[225px] text-xl rounded-xl bg-background-card hover:text-text-contrast hover:scale-105 duration-200 cursor-pointer'
                  onClick={showMoreCards}
                >
                    Show More
                </div>)
            }
            </>  
        )
    }

  return (
    <div className='flex flex-row gap-4 overflow-x-auto overflow-y-hidden scroll-smooth'>
        {renderContent()}
    </div>
  )
}
