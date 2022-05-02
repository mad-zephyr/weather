import * as React from 'react'
import { DayWeather } from '../DayWeather/DayWeather'
import { Slider } from '../Slider/Slider'
import { DaysSliderProps } from './DaysSlider.props'
import style from './DaysSlider.module.sass'

export const DaysSlider = ({showTab, days }: DaysSliderProps): JSX.Element => {

  if (showTab === 1) {
    return (
      <Slider 
        className={style.slider}
        spaceBetween={32}
        slidesPerView={3}
      >
        {days?.map((day, index) => <DayWeather key={index} currentDay={day} index={index}/>)}
      </Slider>
    )
  }

  return <></>
}