import { Routes, Route } from 'react-router-dom'

import { Detail, Home, Movie, Tv } from './pages'
import { Header, Footer } from './components'

function App() {

  return (
    <div className='width-screen min-h-screen bg-background flex flex-col'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/:id' element={<Detail />} />
        
        <Route path='/tv' element={<Tv />} />
        <Route path='/tv/:id' element={<Detail />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
