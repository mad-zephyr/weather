import { createContext, ReactNode, useEffect, useReducer, useState, useContext } from 'react';
import { WeatherData, Location } from '../interfaces/CurrentWeather';
import forecastService from '../services/forecast.service.js';
import localStorageService from '../services/localStorage.service'
import { cityReducer, CityStateProps } from './city.reducer';

export interface IAppContext {
  weatherData?: WeatherData
  cityState?: CityStateProps
  showTab?: number
  bgImage?: string
  setShowTab?: (num: number) => void
  location?: Location
  dispatch?: Function
  children?: ReactNode
}

const cityFromStorage = localStorageService.getCityFromLocalStorage()

const initialData = {
  showTab: 2,
  cityState: {
    cityList: cityFromStorage,
    activeCity: 'Chisinau'
  }
}

export const AppContext = createContext<IAppContext>(initialData)

export const AppContextProvider = ({ children }: IAppContext) => {

  const [cityState, dispatch] = useReducer(cityReducer, initialData.cityState)

  const [weatherData, setWeatherData] = useState<WeatherData>()
  const [showTab, setShowTab] = useState<number>(2)
  const [location, setLocation] = useState<Location>()

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
    const { activeCity } = cityState
    getCurrentWeather({q: activeCity, days: 4})
  }, [cityState.activeCity])

  return <AppContext.Provider value={{
    cityState,
    showTab,
    setShowTab,
    weatherData,
    location: location && location,
    dispatch
  }}>
    {children}
  </AppContext.Provider>
}