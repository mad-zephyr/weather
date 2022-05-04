import React, { useContext, useEffect, useState } from 'react'
import { DayWeather } from '../DayWeather/DayWeather'
import { Slider } from '../Slider/Slider'
import { DaysSliderProps } from './DaysSlider.props'
import style from './DaysSlider.module.sass'
import { AppContext } from '../../context/app.context'
import { ForecastDay } from '../../interfaces/CurrentWeather'

export const DaysSlider: React.FC<DaysSliderProps> = (): JSX.Element => {
  const { showTab, weatherData } = useContext(AppContext)
  const [forecastday, setForecastday] = useState<Array<ForecastDay>>()

  useEffect(() => {
    if (weatherData?.forecast?.forecastday) {
      setForecastday(weatherData?.forecast?.forecastday)

    } 
  }, [weatherData])

  if (showTab === 1) {
    return forecastday
      ? <Slider 
        className={style.slider}
        spaceBetween={32}
        slidesPerView={3}
        >
          {forecastday?.map((day, index) => <DayWeather key={index} currentDay={day} index={index}/>)}
        </Slider>
      : <></>
  }

  return <></>
}