import React, { useContext, useEffect, useState } from 'react'
import { Slider } from '../Slider/Slider';
import { HourSlide } from '../HourSlide/HourSlide'
import { AppContext } from '../../context/app.context';

export const HourlySlider: React.FC = (): JSX.Element => {
  const { showTab, weatherData } = useContext(AppContext)
  const [hour, setHour] = useState()
  const currentTime = Date.now() / 1000

  useEffect(() => {
    if (weatherData?.forecast?.forecastday) {
      const { forecastday } = weatherData?.forecast
      const [hoursDayOne, hoursDayTwo] = [forecastday[0].hour, forecastday[1].hour]
      const curentHourIndex = hoursDayOne.findIndex(item => item.time_epoch >= currentTime)
      const filteredHour = hoursDayOne.slice(curentHourIndex)

      setHour([...filteredHour, ...hoursDayTwo])
      // const filteredHour = hour?.filter(item => item.time_epoch >= currentTime)
    }
  }, [weatherData])


  const curentSlidePerView = (Array.isArray(hour) && hour?.length <= 5)
    ? hour?.length
    : 5

  if (showTab === 0) {
    return hour
      ? <Slider spaceBetween={32} slidesPerView={curentSlidePerView} >
          {hour.map((item, index) => (
            <HourSlide key={item.time_epoch} hour={item} index={index} />
          ))}
      </Slider>
      : <>Loading...</>
  } 
  return <></>
}

