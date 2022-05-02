import React, {useEffect, useState } from 'react'

import { Time } from '../Time/Time'
import { WeatherIcon } from '../weatherIcons/WeatherIcon'
import { CurrentWeather, Condition,  ForecastDay, Hour } from '../../interfaces/interfaces'

import style from './Current.module.sass'
import cn from 'classnames'

export const CurrentSection = (props: CurrentWeather): JSX.Element => {
  const { location, current, forecast } = props
  const [condition, setCondition] = useState<Condition>()
  const [forecastday, setForecastday] = useState<Array<ForecastDay>>()
  const [today, setToday] = useState<ForecastDay>()
  const [currentHour, setCurrentHour] = useState<Hour>()

  
  useEffect(() => {
    if (current?.condition) {
      setCondition(current.condition)
    }
  }, [current])

  useEffect(() => {
    if (forecast?.forecastday) {
      setForecastday(forecast.forecastday)
    }
  }, [forecast])

  useEffect(() => {
    if (forecastday) {
      const [day] = forecastday 
      setToday(day)
    }
  }, [forecastday])

  useEffect(() => {
    const timeNow = Date.now() / 1000
    setCurrentHour(prevState => (
      today?.hour.find(hour => hour.time_epoch >= timeNow )
    ))
  }, [today])

  return (
    <div className={style.wrapper}>
      <div className={style.left}>
        <div className={style.city}>
          {location?.name}
        </div>
        <div className={style.date}>
          <div className={style.description}>Date & local time</div>
          <Time
            location={location?.tz_id}
            watch={true}
            index={null}
          />
        </div>
        <div className={style.weather}>
          <WeatherIcon iconCode={condition?.code} />
          <div className={style.weather__text}>
            {condition?.text}
          </div>
        </div>
      </div>
      <div className={style.temp}>
        <div className={style.temp__now}>
          <div className={cn(style.description, style.description__right)}>Current temperature C</div>
          {currentHour?.temp_c || today?.hour[22].feelslike_c}
        </div>
        <div className={style.temp__minmax}>
          <span>{today?.day.mintemp_c.toFixed(0)}</span> / <span>{today?.day?.maxtemp_c.toFixed(0)}</span> 
        </div>
      </div>
    </div>
  )
}
