import { useSelector } from 'react-redux'

import CardDisplay from '../components/CardDisplay'
import { selectWatchlist } from '../store/slices/watchlistSlice'

export default function Watchlist() {
  const watchlist = useSelector(selectWatchlist);

  return (
    <div className='flex-grow text-text-primary flex flex-col py-2'>
      <h2 className='text-xl font-bold text-center my-4'>
        Watchlist
      </h2>

      {
        watchlist.length > 0 ? (
          <CardDisplay cardData={watchlist} loading={false} />
        ) : (
          <div className='text-center my-4'>
            No Content in Watchlist
          </div>
        )
      }
    </div>
  )
}
