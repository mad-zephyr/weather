import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper';
import LeftArrow from '../../assets/arrow.svg';
import RightArrow from '../../assets/arrowL.svg';

import 'swiper/css'
import 'swiper/css/navigation'
import "swiper/css/bundle";

import style from './Slider.module.sass'
import { SliderProps } from './Slider.props'
import cn from 'classnames';

export const Slider: React.FC<SliderProps> = (props: SliderProps): JSX.Element => {
  const { spaceBetween = 48, slidesPerView = 5, centered = false, className, children } = props
  
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)


  return (
    <div className={style.section}>
      <div
        className={cn(style.shopFront__navigation, 'prev')}
        ref={navigationPrevRef}
      >
        <LeftArrow  />
      </div>
      <Swiper
        className={className}
        modules={[Navigation]}
        
        navigation={{
          prevEl: '.prev',
          nextEl: '.next'
        }}

        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        grabCursor={true}
        centeredSlides={centered}
        onSlideChange={(): void => console.log()}

      >{children?.map((child, index) => (
        <SwiperSlide key={index}>
          {child}
        </SwiperSlide>
      ))}
      </Swiper>
      <div
        className={cn(style.shopFront__navigation, 'next')}
        ref={navigationNextRef}>
        <RightArrow />
      </div>
    </div>
  )
}