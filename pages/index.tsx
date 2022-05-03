import React, { useEffect, useState } from 'react'
import { CurrentSection, Navigation, HourlySlider, DaysSlider, Header } from '../components/index'
import { CurrentWeather, EveryHour, ForecastDay, Location } from '../interfaces/CurrentWeather' 
import { Temporal } from '@js-temporal/polyfill'

import bg from '../assets/chisinau_bg.jpg'
import style from './index.module.sass'
import forecastService from '../services/forecast.service.js'
import LineChart from '../components/Chart/LineChart'
import photoService from '../services/photo.service';
import { getRandom } from '../utils/getRandom';

export default function Weather(): JSX.Element {
  const [showTab, setShowTab] = useState<number>(0)
  const [day, setDay] = useState<number>(0)
  const [city, setCity] = useState<string>('Chisinau')
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>()
  const [forecastDay, setForecastDay] = useState<Array<ForecastDay>>()
  const [location, setLocation] = useState<Location>()
  const [fourcastHours, setFourcastHours] = useState<EveryHour>()
  const [zonedTime, setZonedTime] = useState<number>()
  const [bgImage, setBgImage] = useState()

  async function getCurrentWeather(payload: object) {
    const data: CurrentWeather = await forecastService.get(payload);
    setCurrentWeather(data);
  }

  const fetchBGPhoto = async (location) => {
    if (location) {
      try {
        const { results } = await photoService.get({ query: location?.name })
        const index = getRandom(0, results.length - 1)
        setBgImage(results[index].urls.regular)
      } catch (error) {}
    }
  }

  useEffect(() => {
    if (currentWeather) {
      
      const { location } = currentWeather
      setLocation(location)

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
    fetchBGPhoto(location)
  }, [location])

  useEffect(() => {
    getCurrentWeather({q: city, days: 4})
  }, [city])

  const currentTime = Date.now() / 1000

  return (
    <>
      <Header
        setCity={setCity}
      />
      { currentWeather
        ? <div className={style.main}>
          
          <div className={style.wrapper}>
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
            <LineChart
              showTab={showTab}
              data={fourcastHours}
            />
            </div>
          </div>
                <div className={style.bg} style={{ background: `url(${bgImage}) center center/cover no-repeat` }}/>
          </div>
          : <>Loading... </> }
    </>  
  )
}
