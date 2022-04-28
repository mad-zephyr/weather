import React from 'react'
import { DayWeatherProps } from './DayWeather.props'

import style from './DayWeather.module.sass'
import { Time } from '../Time/Time'

export const DayWeather: React.FC<DayWeatherProps> = ({ currentDay }): JSX.Element => {

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

  console.log('FEELS: ', hour[0].feelslike_c)

  return (
    <div className={style.content}>
      <div className={style.date}>{<Time date={currentDay.date} />}</div>
      <div className={style.day}>
        <img src={`https:${day.condition.icon}`} alt={day.condition.text} />
        <div className={style.day__temp}>{ day.maxtemp_c}</div>
      </div>
      <div className={style.footer}>
        <div className={style.text}> Feels like: <span>{ getMin(hour) }</span> </div>
        <div className={style.text}> Sunset: <span>{astro.sunset}</span> </div>
      </div>
    </div>
  )
}