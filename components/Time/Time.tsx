import React, { useEffect } from 'react'
import { Temporal, Intl } from '@js-temporal/polyfill'
import { TimeProps } from './Time.props'
import useInterval from '../../hooks/useInterval'

import style from './Time.module.sass'
import { useState } from 'react'

export const Time: React.FC<TimeProps> = ({ location, watch = false, index = 0 }:TimeProps): JSX.Element => {
  const [clock, setClock] = useState('')
  const zonedTimeNow = Temporal.Now.zonedDateTimeISO(location).with({day: index + 1})

  const updateClock = ():void => {
    const hours = zonedTimeNow.hour
    const min = zonedTimeNow.minute
    const sec = zonedTimeNow.second

    const addZero = (num: number): string | number => {
      return num < 10
        ? String(num).padStart(2, '0')
        : num
    }
    setClock(prevState => `${hours}:${addZero(min)}:${addZero(sec)}`)
  }

  useInterval(updateClock, 1000)

  const setIntlDate = (countryCode = 'en-En') => {
    const date = new Intl.DateTimeFormat(countryCode, {
      dateStyle: 'full'
    }).format(zonedTimeNow).replaceAll(',', '').split(' ')
    return date
  }

  const currentDate = setIntlDate()

  return (
    <div className={style.timer}>
      <div className={style.date}>
        <span>{currentDate[1]} {currentDate[2]}, {currentDate[3]}</span>
      </div>
      {watch && <div className={style.clock}>{clock || 'Local time'}</div>}
    </div>
  )
}