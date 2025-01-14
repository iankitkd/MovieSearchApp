import React from 'react'

import {Card, CardPerson, Loader, NoContentFound} from "./index"

export default function CardDisplay({cardData, loading}) {

    const renderContent = () => {
        if(loading) {
            return (<Loader />)
        }

        if(cardData.length == 0) {
            return (<NoContentFound />)
        }

        return (
            cardData.map((ele) => {
                if(ele.media_type == "person") {
                    return(
                        <CardPerson 
                            key={ele.id}
                            id={ele.id}
                            name={ele.title}
                            image_path={ele.image_path}
                            known_for_department={ele.known_for_department}
                        />
                    )
                }
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
