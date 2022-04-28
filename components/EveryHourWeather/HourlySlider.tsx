import * as React from 'react'
import { HourlySliderProps } from './HourlySliderProps.props';
import { Slider } from '../Slider/Slider';
import { HourSlide } from '../HourSlide/HourSlide'

export const HourlySlider = ({ hour, showTab, currentTime }: HourlySliderProps): JSX.Element => {
  const filteredHour = hour?.filter(item => item.time_epoch >= currentTime)

  if (showTab === 0) {
    return filteredHour
      ? <Slider spaceBetween={32} slidesPerView={5} >
          {filteredHour.map((item, index) => (
            <HourSlide key={item.time_epoch} hour={item} index={index} />
          ))}
      </Slider>
      : <>Loading...</>
  } 
  return <></>
}

