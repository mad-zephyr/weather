import React from 'react'
import { GetTimeOfDay } from '../getTimeOfDay'
import style from './Hour.module.sass'

interface HourInterface {
  hour: {
    temp_c: number
    condition: {
      icon: string
      text: string
    }
    time: string
  }
  index: number
}

export const HourSlide = ({ hour, index }: HourInterface): JSX.Element => {
  const { temp_c, condition, time } = hour

  return (
    <div className={style.hour}>
      <div className={style.time}>
        <GetTimeOfDay
          time={time}
          index={index}
        />
      </div>
      <div className="icon">
        <img
          src={`https:${condition.icon}`}
          alt={condition.text} />
      </div>
      <div className={style.temp}> {temp_c} </div>
    </div>
  )
}