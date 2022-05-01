import React from 'react'
import { DayWeatherProps } from './DayWeather.props'

import style from './DayWeather.module.sass'
import { Time } from '../Time/Time'
import { WeatherIcon } from '../weatherIcons/WeatherIcon'

export const DayWeather: React.FC<DayWeatherProps> = ({ currentDay, index }): JSX.Element => {
  const { day, astro, hour } = currentDay

  function getMin(array): number {
    let minFeelsLikeTemp: number = 0
    array.forEach((hour) => {
      if (hour.feelslike_c > minFeelsLikeTemp) {
        minFeelsLikeTemp = hour.feelslike_c
      }
    })
    return minFeelsLikeTemp
  }

  return (
    <div className={style.content}>
      <div className={style.date}>
        <Time
          // date={currentDay.date}
          index={index}
        />
      </div>
      <div className={style.day}>
        <WeatherIcon iconCode={day.condition.code} />
        <div className={style.day__temp}>{ day.maxtemp_c}</div>
      </div>
      <div className={style.footer}>
        <div className={style.text}> Feels like: <span>{ getMin(hour) }</span> </div>
        <div className={style.text}> Sunset: <span>{astro.sunset}</span> </div>
      </div>
    </div>
  )
}