import React from 'react'

import {Card, Loader} from "./index"

export default function CardDisplay({cardData, loading}) {

    const renderContent = () => {
        if(loading) {
            return (<Loader />)
        }

        if(cardData.length == 0) {
            return (<div className='mx-auto p-6 text-xl'> Content Found </div>)
        }

        return (
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
        )
    }


  return (
    <div className='flex flex-row flex-wrap justify-center md:mx-4 md:gap-2'>
        {renderContent()}
    </div>
  )
}
