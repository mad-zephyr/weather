import React from 'react'

import style from './Navigation.module.sass'
import cn from 'classnames'
import { NavigationProps } from './Navigation.props'

export const Navigation = (props: NavigationProps): JSX.Element => {
  const { setShowTab, showTab } = props

  const data = ['Hourly', 'Daily', 'Details', 'Precipitation']

  return (
    <div className={style.navigation}>
      {data.map((item, index) => <div
        onClick={() => setShowTab(index)}
        key={item + index}
        className={cn(style.btn, {
          [style.btn__active]: showTab === index
        })}
      >{item}</div>)}
    </div>
  )
}