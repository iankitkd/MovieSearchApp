
import {Card, CardPerson, Loader, NoContentFound} from "./index"

export default function CardDisplay({cardData, isLoading}) {

    const renderContent = () => {
        if(isLoading) {
            return (<Loader />)
        }

        if(cardData && cardData.length == 0) {
            return (<NoContentFound />)
        }

        return (
            cardData?.map((ele) => {
                if(ele.media_type == "person") {
                    return(
                        <CardPerson 
                            key={ele.id}
                            content={ele}
                        />
                    )
                }
                return (
                <Card 
                    key={ele.id}
                    content={ele}
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
