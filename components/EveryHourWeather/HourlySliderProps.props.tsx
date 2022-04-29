import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { Hour } from '../../interfaces/CurrentWeather';

export interface HourlySliderProps  {
  hour?: Array<Hour>
  currentTime: number
  showTab: number
  className?: string
  spaceBetween?: number
  slidesPerView?: number

	children?: ReactNode | Array<ReactNode>;
}