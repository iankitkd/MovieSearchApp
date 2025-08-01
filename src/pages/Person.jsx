
import { CardDisplay } from '../components'
import { usePersonsQuery } from '../services/queries';

export default function Person() {
  const personQuery = usePersonsQuery();
  const { data: personList, isLoading } = personQuery;

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
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
