import * as React from 'react'
import { HourlySliderProps } from './HourlySliderProps.props';
import { Slider } from '../Slider/Slider';
import { HourSlide } from '../HourSlide/HourSlide'

export const HourlySlider = ({ hour, showTab, currentTime }: HourlySliderProps): JSX.Element => {

  const filteredHour = hour?.filter(item => {
    return item.time_epoch >= currentTime
  })

  const curentSlidePerView = (Array.isArray(filteredHour) && filteredHour?.length <= 5)
    ? filteredHour?.length
    : 5

  if (showTab === 0) {
    return filteredHour
      ? <Slider spaceBetween={32} slidesPerView={curentSlidePerView} >
          {filteredHour.map((item, index) => (
            <HourSlide key={item.time_epoch} hour={item} index={index} />
          ))}
      </Slider>
      : <>Loading...</>
  } 
  return <></>
}

