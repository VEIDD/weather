import { createRoot } from 'react-dom/client'
import { Layout } from './Layout'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Weather } from './components/weather/Weather'
import { WeatherDay } from './components/weather/WeatherDay'
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<Layout/>} />
      <Route path='/weather-day' element={<WeatherDay/>} />
      <Route path='/weather' element={<Weather/>} />
    </Routes>
  </HashRouter>
)
