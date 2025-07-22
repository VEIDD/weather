import { createRoot } from 'react-dom/client'
import { Layout } from './Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Weather } from './components/weather/Weather'
import { WeatherDay } from './components/weather/WeatherDay'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/weather-app/' element={<Layout/>} />
      <Route path='/' element={<Layout/>} />
      <Route path='/weather-day' element={<WeatherDay/>} />
      <Route path='/weather' element={<Weather/>} />
    </Routes>
  </BrowserRouter>
)
