import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Splash from './pages/Splash'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
