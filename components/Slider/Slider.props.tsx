import { ReactNode } from 'react'
import { Hour } from '../../interfaces/CurrentWeather'

export interface SliderProps {
  spaceBetween?: number
  slidesPerView?: number
  centered?: boolean
  className?: string
  
  children?: Array<ReactNode>
}