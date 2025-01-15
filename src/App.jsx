import { Routes, Route } from 'react-router-dom'

import { Detail, DetailPerson, ErrorPage, Home, Movie, Person, Tv, Watchlist } from './pages'
import { Header, Footer, ScrollToTop } from './components'

function App() {

  return (
    <div className='width-screen min-h-screen bg-background flex flex-col'>
      <ScrollToTop />
      
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/:id' element={<Detail />} />
        
        <Route path='/tv' element={<Tv />} />
        <Route path='/tv/:id' element={<Detail />} />

        <Route path='/person/' element={<Person />} />
        <Route path='/person/:id' element={<DetailPerson />} />
        
        <Route path='/watchlist/' element={<Watchlist />} />

        <Route path='*' element={<ErrorPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
