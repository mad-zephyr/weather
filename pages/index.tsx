import React, { useEffect, useState } from 'react'
import { CurrentSection, Navigation, HourlySlider, Slider, HourSlide, DaysSlider } from '../components/index'
import { Current, CurrentWeather, EveryHour, Forecast, ForecastDay, Location } from '../interfaces/CurrentWeather' 
import { Temporal } from '@js-temporal/polyfill'

import bg from '../assets/chisinau_bg.jpg'
import style from './index.module.sass'
import forecastService from '../services/forecast.service.js'

export default function Weather(): JSX.Element {
  const [showTab, setShowTab] = useState<number>(0)
  const [day, setDay] = useState<number>(0)
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>()
  const [forecastDay, setForecastDay] = useState<Array<ForecastDay>>()
  const [current, setCurrent] = useState<Current>()
  const [location, setLocation] = useState<Location>()
  const [showDay, setShowDay] = useState<EveryHour>()

  async function getCurrentWeather(payload: object) {
    const data: CurrentWeather = await forecastService.get(payload);
    setCurrentWeather(data);
  }

  useEffect(() => {
    if (currentWeather) {
      
      const { location } = currentWeather
      setLocation(location)

      const { current } = currentWeather
      setCurrent(current)

      if (currentWeather?.forecast ) {
        const { forecastday } = currentWeather.forecast
        setForecastDay(forecastday)
      }
    }

  }, [currentWeather])

  useEffect(() => {
    getCurrentWeather({q: 'Chisinau', days: 7})
  }, [])

  const currentTime = Date.now() / 1000

  console.log('currentWeather: ', currentWeather)
  // console.log('forecastDay: ', forecastDay)

  return  currentWeather
    ? <>
        <div className={style.main}>
          <div className={style.container}>
            <CurrentSection {...currentWeather}
            />
            <Navigation
              setShowTab={setShowTab}
              showTab={showTab}
            />
            <HourlySlider
              currentTime={currentTime}
              showTab={showTab}
              hour={forecastDay?.[day].hour}
            />
            <DaysSlider
              showTab={showTab}
              days={forecastDay}
              className={style.hourSLider}
            />
          </div>
          <div className={style.bg} style={{ background: `url(${bg.src}) center center/cover no-repeat` }}/>
        </div> 
    </>
    : <>Loading... </>

  
}
