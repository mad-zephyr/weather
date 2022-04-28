import React from 'react'
import { Temporal, Intl } from '@js-temporal/polyfill'
import { TimeProps } from './Time.props'

export const Time: React.FC<TimeProps> = ({ date }): JSX.Element => {
  console.log('DATE: ', date)
  const [data, time] = date.split(' ')
  const timeNow = Temporal.PlainDate.from(data)

  const setIntlDate = (countryCode = 'en-En') => {
    const date = new Intl.DateTimeFormat(countryCode, { dateStyle: 'full' }).format(timeNow).replaceAll(',', '').split(' ')
    return date
  }

  const currentDate = setIntlDate()


  return (
    <><span>{currentDate[1]} {currentDate[2]}, {currentDate[3]}</span></>
  )
}