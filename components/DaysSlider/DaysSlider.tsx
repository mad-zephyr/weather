import * as React from 'react'
import { DayWeather } from '../DayWeather/DayWeather'
import { Slider } from '../Slider/Slider'
import { DaysSliderProps } from './DaysSlider.props'

export const DaysSlider = ({showTab, days, children }: DaysSliderProps): JSX.Element => {
  console.log('DAYS: ', days)
  if (showTab === 1) {
    return (
      <Slider spaceBetween={32} slidesPerView={3}>
        {days?.map((day, index) => <DayWeather key={index} currentDay={day} />)}
      </Slider>
    )
  }

  return <></>
}