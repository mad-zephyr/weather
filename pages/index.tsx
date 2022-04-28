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

      if ('location' in currentWeather) {
        const { location } = currentWeather
        setLocation(location)
      }

      if ('current' in currentWeather) {
        const { current } = currentWeather
        setCurrent(current)
      }

      if ('forecast' in currentWeather && 'forecastday' in currentWeather.forecast ) {
        const { forecastday } = currentWeather.forecast
        setForecastDay(forecastday)
      }
    }

  }, [currentWeather])

  useEffect(() => {
    getCurrentWeather({q: 'Chisinau', days: 7})
  }, [])

  const timeNow = Temporal.Now.plainDateTimeISO()
  // console.log('currentWeather: ', currentWeather)
  // console.log('forecastDay: ', forecastDay)
  console.log('showTab: ', showTab)

  return (
    <div className={style.main}>
      <div className={style.container}>
        {currentWeather && <CurrentSection {...currentWeather} />}
        <Navigation setShowTab={setShowTab} showTab={showTab}/>
        <HourlySlider showTab={showTab} hour={forecastDay?.[day].hour}/>
        <DaysSlider showTab={showTab} days={forecastDay} className={style.hourSLider} />
      </div>
      <div className={style.bg} style={{ background: `url(${bg.src}) center center/cover no-repeat` }}/>
    </div>
  )
}
