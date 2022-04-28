import { ReactNode } from 'react'

export interface NavigationProps {
  setShowTab: Function
  showTab: number
  
  children?: ReactNode
}
