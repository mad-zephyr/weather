import React, { useContext, useEffect } from 'react'
import { Temporal, Intl } from '@js-temporal/polyfill'
import { TimeProps } from './Time.props'
import useInterval from '../../hooks/useInterval'

import style from './Time.module.sass'
import { useState } from 'react'
import { AppContext } from '../../context/app.context'

export const Time: React.FC<TimeProps> = ({ watch = false, index = 0 }:TimeProps): JSX.Element => {
  const { weatherData } = useContext(AppContext)
  const [clock, setClock] = useState('')
  const [location, setLocation] = useState<string>()
  const [zonedTime, setZonedTime] = useState<any>()

  useEffect(() => {

    if (index !== null && index >= 0) {
      const zonedTimeNow = Temporal.Now.zonedDateTimeISO(location).add({ days: index })
      setZonedTime(zonedTimeNow)
      return
    }

    const zonedTimeNow = Temporal.Now.zonedDateTimeISO(location)
    setZonedTime(zonedTimeNow)
    
  }, [location])


  useEffect(() => {
    if (weatherData?.location) {
      const { location } = weatherData
      setLocation(location.tz_id)
    }
  }, [weatherData])

  const updateClock = (): void => {
    const zonedTimeNow = Temporal.Now.zonedDateTimeISO(location)
    const hours = zonedTimeNow?.hour
    const min = zonedTimeNow?.minute
    const sec = zonedTimeNow?.second

    const addZero = (num: number): string | number => {
      return num < 10
        ? String(num).padStart(2, '0')
        : num
    }
    setClock(prevState => `${hours}:${addZero(min)}:${addZero(sec)}`)
  }

  if (watch) {
    useInterval(updateClock, 1000)
  }

  const setIntlDate = (countryCode = 'en-En') => {
    const date = new Intl.DateTimeFormat(countryCode, {
      dateStyle: 'full'
    }).format(zonedTime).replaceAll(',', '').split(' ')
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