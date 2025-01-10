import { Routes, Route } from 'react-router-dom'

import { Home, Movie, Tv } from './pages'
import { Header, Footer } from './components'

function App() {

  return (
    <div className='width-screen min-h-screen bg-background flex flex-col'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/tv' element={<Tv />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
