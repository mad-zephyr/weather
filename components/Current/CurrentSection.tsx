import React from 'react'

import style from './Current.module.sass'
import { CurrentWeather } from '../../interfaces/interfaces'
import { Temporal } from '@js-temporal/polyfill'
import { Time } from '../Time/Time'

export const CurrentSection = (props: CurrentWeather): JSX.Element => {
  const { location, current, forecast } = props
  console.log(props)
  const { condition } = current
  const { forecastday } = forecast
  const [today] = forecastday
  
  const { last_updated } = current
  
  return (
    <div className={style.wrapper}>
      <div className={style.left}>
        <div className={style.city}>
          {location.name}
        </div>
        <div className={style.date}>
          <Time date={last_updated} />
        </div>
        <div className={style.weather}>
          <img src={`https:${condition.icon}`} />
          <div className={style.weather__text}>
            {condition.text}
          </div>
        </div>
      </div>
      <div className={style.temp}>
        <div className={style.temp__now}>
          {current.temp_c}
        </div>
        <div className={style.temp__minmax}>
          <span>{today.day?.mintemp_c.toFixed(0)}</span> / <span>{today.day?.maxtemp_c.toFixed(0)}</span> 
        </div>
      </div>
    </div>
  )
}
