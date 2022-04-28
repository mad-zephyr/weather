import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { Hour } from '../../interfaces/CurrentWeather';

export interface HourlySliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  hour?: Array<Hour>
  showTab: number
  className?: string
  spaceBetween?: number
  slidesPerView?: number

	children?: ReactNode | Array<ReactNode>;
}