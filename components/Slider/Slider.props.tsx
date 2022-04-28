import { ReactNode } from 'react'
import { Hour } from '../../interfaces/CurrentWeather'

export interface SliderProps {
  spaceBetween?: number
  slidesPerView?: number
  className?: string
  
  children?: ReactNode
}