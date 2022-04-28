import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';
import LeftArrow from '../../assets/arrow.svg';
import RightArrow from '../../assets/arrowL.svg';

import 'swiper/css'
import 'swiper/css/navigation'
import "swiper/css/bundle";

import style from './HoursSlider.module.sass'
import { SliderProps } from './Slider.props';
import { HourSlide } from '../HourSlide/HourSlide';
import { setTimeout } from 'timers';

export const Slider: React.FC<SliderProps> = (props: SliderProps): JSX.Element => {
  const { spaceBetween = 48, slidesPerView = 5, className, children } = props
  
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)

  return (
    <div className={style.section}>
      <div className={style.shopFront__navigation} ref={navigationPrevRef} >
        <LeftArrow  />
      </div>
      <Swiper
        className={className}
        modules={[Navigation]}

        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        grabCursor={true}
        onSlideChange={(): void => console.log() }
        onSwiper={(swiper) => {
          setTimeout(() => {
            try {
            // Override prevEl & nextEl now that refs are defined
            swiper.params.navigation.prevEl = navigationPrevRef.current
            swiper.params.navigation.nextEl = navigationNextRef.current

            // Re-init navigation
            swiper.navigation.destroy()
            swiper.navigation.init()
            swiper.navigation.update()
          } catch (error) {}
          })
        }}
      >{children?.map((child, index) => (
        <SwiperSlide key={child+index}>
          {child}
        </SwiperSlide>
      ))}
      </Swiper>
      <div className={style.shopFront__navigation} ref={navigationNextRef}>
        <RightArrow />
      </div>
    </div>
  )
}