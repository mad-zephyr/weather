import { ReactNode } from 'react'

export interface CurentProps {
  location: string
  date: string
  code?: number
  icon?: string
  text?: string
  
  children?: ReactNode
}