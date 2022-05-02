import { ReactNode } from 'react'

export interface InputProps {
  label?: string
  inputType: string
  value: {
    city: string
  }
  classes?: string
  name: string
  onChange: Function
  placeholder?: string
  error?: string
  touchInput?: string

  children?: ReactNode;
}