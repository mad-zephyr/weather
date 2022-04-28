import React from 'react'

interface GetTimeOfDay {
  time: string
  index: number
}

export const GetTimeOfDay: React.FC<GetTimeOfDay> = ({time, index}): JSX.Element => {
  if (index === 0) {
    return <span> NOW </span>
  }
  if (time.length > 0) {
    const timeReg = /\d{2}:\d{2}/gm
    const forecastHour = time.match(timeReg)?.[0].split(':')[0];
    const partOfDay = parseInt(forecastHour ? forecastHour : '') <= 12
      ? 'am'
      : 'pm'
    return <> <span> {forecastHour} </span> <span>{partOfDay}</span ></>
  }
  return <></>
}