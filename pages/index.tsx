import React, { useEffect, useState } from 'react'
import { CurrentSection, Navigation, HourlySlider, Slider, HourSlide, DaysSlider, Header } from '../components/index'
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
  const [fourcastHours, setFourcastHours] = useState<EveryHour>()
  const [zonedTime, setZonedTime] = useState<number>()

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
    if (forecastDay) {
       setFourcastHours(prevState => [...forecastDay?.[day].hour, ...forecastDay?.[day+1].hour ] )
    }
  }, [forecastDay])

  useEffect(() => {
    if (location) {
      const timeNow = Temporal.Now.zonedDateTimeISO(location?.tz_id).epochMilliseconds
      setZonedTime(timeNow)
    }
  }, [location])

  useEffect(() => {
    getCurrentWeather({q: 'Chisinau', days: 4})
  }, [])

  const currentTime = Date.now() / 1000

  return (
    <>
      <Header />
      { currentWeather
          ? <div className={style.main}>
                <div className={style.container}>
                  <CurrentSection {...currentWeather}/>
                  <Navigation
                    setShowTab={setShowTab}
                    showTab={showTab}
                  />
                  <HourlySlider
                    currentTime={currentTime}
                    showTab={showTab}
                    hour={fourcastHours}
                  />
                  <DaysSlider
                    showTab={showTab}
                    days={forecastDay}
                    className={style.hourSLider}
                  />
                </div>
                <div className={style.bg} style={{ background: `url(${bg.src}) center center/cover no-repeat` }}/>
              </div> 
          : <>Loading... </> }
    </>  
  )
}
