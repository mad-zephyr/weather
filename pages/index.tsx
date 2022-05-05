import React from 'react'
import { CurrentSection, Navigation, HourlySlider, DaysSlider, Header, Background } from '../components/index'

import style from './index.module.sass'
import LineChart from '../components/Chart/LineChart'
import { AppContextProvider } from '../context/app.context'

const Weather: React.FC = (): JSX.Element => {

  return (
    <AppContextProvider>
      <Header />
      <div className={style.main}>
        <div className={style.wrapper}>
          <div className={style.container}>
            <CurrentSection />
            <Navigation />
            <HourlySlider />
            <DaysSlider className={style.hourSLider} />
            <LineChart />
          </div>
        </div>
        <Background />
      </div>
    </AppContextProvider>  
  )
}

export default Weather

