import React, { useContext } from 'react'

import style from './Navigation.module.sass'
import cn from 'classnames'
import { NavigationProps } from './Navigation.props'
import { AppContext } from '../../context/app.context'

export const Navigation: React.FC<NavigationProps> = (): JSX.Element => {
  const { showTab, setShowTab } = useContext(AppContext)

  const data = ['Hourly', 'Daily', 'Details', 'Precipitation']

  return (
    <div className={style.navigation}>
      {data.map((item, index) => <div key={item + index}
        onClick={() => setShowTab && setShowTab(index)} 
        className={cn(style.btn, { [style.btn__active]: showTab === index})}
      >{item}</div>)}
    </div>
  )
}