import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { Hour } from '../../interfaces/CurrentWeather';

export interface HourlySliderProps  {
  hour?: Array<Hour>
  className?: string
  spaceBetween?: number
  slidesPerView?: number

	children?: ReactNode | Array<ReactNode>;
}