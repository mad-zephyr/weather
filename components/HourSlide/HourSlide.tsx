import React from 'react'
import { GetTimeOfDay } from '../getTimeOfDay'
import style from './Hour.module.sass'
import { WeatherIcon } from '../weatherIcons/WeatherIcon'

interface HourInterface {
  hour: {
    temp_c: number
    condition: {
      icon: string
      text: string
      code: number
    }
    time: string
  }
  index: number
}

export const HourSlide = ({ hour, index }: HourInterface): JSX.Element => {
  const { temp_c, condition, time } = hour
  const { code } = condition
  
  return (
    <div className={style.hour}>
      <div className={style.time}>
        <GetTimeOfDay
          time={time}
          index={index}
        />
      </div>
      <div className={style.icon}>
        <WeatherIcon iconCode={code}/>
      </div>
      <div className={style.temp}> {temp_c} </div>
    </div>
  )
}