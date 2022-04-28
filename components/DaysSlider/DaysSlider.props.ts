import { ReactNode } from 'react'
import { ForecastDay } from '../../interfaces/CurrentWeather'

export interface DaysSliderProps {
  days?: Array<ForecastDay>
  showTab?: number
  className?: string
  spaceBetween?: number

  children?: ReactNode
}