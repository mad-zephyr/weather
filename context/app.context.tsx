import { createContext, PropsWithChildren, ReactNode, useEffect, useReducer, useState, useContext } from 'react';
import { WeatherData, Location } from '../interfaces/CurrentWeather';
import forecastService from '../services/forecast.service.js';
import localStorageService from '../services/localStorage.service'
import { cityReducer, CityStateProps } from './city.reducer';

export interface IAppContext {
  weatherData?: WeatherData
  cityState: CityStateProps
  bgImage?: string
  showTab: number
  setShowTab?: (num: number) => void
  location?: Location
  children?: ReactNode
}

const initialData = {
  showTab: 2,
  cityState: {
    cityList: localStorageService.getCityFromLocalStorage(),
    activeCity: 'Chisinau'
  }
}

export const AppContext = createContext<IAppContext>(initialData)

export const AppContextProvider = ({ children }: PropsWithChildren<IAppContext>)=> {
  const [weatherData, setWeatherData] = useState<WeatherData>()
  const data = useContext(AppContext)
  const [showTab, setShowTab] = useState<number>(2)
  const [cityState, dispatch] = useReducer(cityReducer, data.cityState)
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

  console.log('cityState: ', cityState, data)

  useEffect(() => {
    getCurrentWeather({q: cityState.activeCity, days: 4})
  }, [cityState])

  return <AppContext.Provider value={{
    cityState,
    showTab,
    setShowTab,
    weatherData,
    location: location && location
  }}>
    {children}
  </AppContext.Provider>
}