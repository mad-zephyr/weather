import { createContext, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { WeatherData, Location } from '../interfaces/CurrentWeather';
import forecastService from '../services/forecast.service.js';

export interface IAppContext {
  weatherData?: WeatherData
  city?: string
  bgImage?: string
  showTab: number
  setShowTab?: (num: number) => void
  setCity?: (city: string) => void
  location?: Location
  children?: ReactNode
}

const initialData = {
  showTab: 2,
}

export const AppContext = createContext<IAppContext>(initialData)

export const AppContextProvider = ({ children }: PropsWithChildren<IAppContext>)=> {
  const [weatherData, setWeatherData] = useState<WeatherData>()
  const [showTab, setShowTab] = useState<number>(3)
  const [cityState, setCityState] = useState<string>('Chisinau')
  const [location, setLocation] = useState<Location>()

  const setCity = (city: string) => {
    setCityState(city)
  }

  async function getCurrentWeather(payload: object) {
    try {
      const weatherData: WeatherData = await forecastService.get(payload);

      if (weatherData?.location) {
        const { location } = weatherData
        setLocation(location)
      }

      setWeatherData(weatherData);
    } catch (error) { }
  }

  useEffect(() => {
    getCurrentWeather({q: cityState, days: 4})
  }, [cityState])

  return <AppContext.Provider value={{
    city: cityState,
    setCity,
    showTab,
    setShowTab,
    weatherData,
    location: location && location
  }}>
    {children}
  </AppContext.Provider>
}