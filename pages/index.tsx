import React from 'react'
import { CurrentSection, Navigation, HourlySlider, DaysSlider, Header, Background } from '../components/index'

import style from './index.module.sass'
import LineChart from '../components/Chart/LineChart'
import { AppContextProvider } from '../context/app.context'
import localStorageService from '../services/localStorage.service'

const Weather: React.FC = (): JSX.Element => {

  const cityState = {
    cityList: localStorageService.getCityFromLocalStorage(),
    activeCity: 'Chisinau'
  }

  return (
    <AppContextProvider cityState={cityState} showTab={2}>
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

