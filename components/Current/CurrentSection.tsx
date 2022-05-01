import React from 'react'

import style from './Current.module.sass'
import { CurrentWeather } from '../../interfaces/interfaces'
import { Time } from '../Time/Time'
import { WeatherIcon } from '../weatherIcons/WeatherIcon'

export const CurrentSection = (props: CurrentWeather): JSX.Element => {
  const { location, current, forecast } = props

  const { condition } = current 
  const { forecastday } = forecast 

  const [today] = forecastday

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
          />
        </div>
        <div className={style.weather}>
          <WeatherIcon iconCode={condition.code} />
          <div className={style.weather__text}>
            {condition.text}
          </div>
        </div>
      </div>
      <div className={style.temp}>
        <div className={style.temp__now}>
          {current?.temp_c}
        </div>
        <div className={style.temp__minmax}>
          <span>{today.day?.mintemp_c.toFixed(0)}</span> / <span>{today.day?.maxtemp_c.toFixed(0)}</span> 
        </div>
      </div>
    </div>
  )
}
