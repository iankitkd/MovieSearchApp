import React, { useState } from 'react'

import {Card, CardPerson, LoaderMovingBar, NoContentFound} from './index'

export default function CardHorizontal({cardData, type, isLoading, showLoader=true}) {
    const [visibleCount, setVisibleCount] = useState(20);

    const showMoreCards = () => {
        setVisibleCount((prevCount) => prevCount + 20);
    };

    const renderContent = () => {
        if(isLoading) {
            return (showLoader ? <LoaderMovingBar /> : <div></div>)
        }

        if(cardData && cardData.length == 0) {
            return (<NoContentFound />)
        }

        return (
            <>
            {cardData?.slice(0, visibleCount).map((ele) => {
                if(type == "person" || ele.media_type == "person") {
                    return(
                        <CardPerson 
                            key={ele.id}
                            content={ele}
                        />
                    )
                }
                return(
                    <Card 
                        key={ele.id}
                        content={ele}
                    />
                )})
            }
            {visibleCount < cardData.length &&
                (<div className='mt-2 min-w-[150px] max-h-[225px] text-xl rounded-xl hover:text-text-contrast hover:scale-105 duration-200 cursor-pointer'>
                    <div className={`${type == "person" ? "min-h-[150px] rounded-full" : "h-full rounded-xl"} flex justify-center items-center bg-background-card`}
                        onClick={showMoreCards}   
                    >
                        Show More
                    </div>
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
