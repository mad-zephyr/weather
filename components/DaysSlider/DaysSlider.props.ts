import { ReactNode } from 'react'
import { ForecastDay } from '../../interfaces/CurrentWeather'

export interface DaysSliderProps {
  days?: Array<ForecastDay>
  className?: string
  spaceBetween?: number

  children?: ReactNode
}