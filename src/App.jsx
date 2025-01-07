import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import { Header, Footer } from './components'

function App() {

  return (
    <div className='width-screen min-h-screen bg-background flex flex-col'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
