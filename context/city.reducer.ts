import localStorageService from '../services/localStorage.service'

export enum CityEnum {
  deleteCity = 'CITY_DELETED',
  addCity = 'CITY_ADDED',
  setActiveCity = 'CITY_SETTED'
}

export type cityActions = { type: CityEnum.deleteCity } | { type: CityEnum.addCity } | { type: CityEnum.setActiveCity }

export interface CityProps {
  country: string
  id: number
  lat: number
  lon: number
  name: string
  region: string
  url: string
}

export interface CityReducerState {
  type: CityEnum
  payload: CityProps
}

export interface CityStateProps {
  cityList: Array<CityProps>
  activeCity: string
}

export const cityReducer = (state: CityStateProps, action: CityReducerState): CityStateProps => {
  const {type, payload} = action

  switch (type) {
    case CityEnum.addCity:
      localStorageService.addCityToLocalStorage(payload)
      return {
        ...state,
        cityList: [...state.cityList, payload]
      }

    case CityEnum.setActiveCity:
      return {
        ...state,
        activeCity: payload.name
      }

    case CityEnum.deleteCity:
      const index = state.cityList.findIndex(city => city.id === Number(payload.id))
      state.cityList.splice(index, 1)
      localStorageService.removeCityFromStorage(payload)
      return {
        ...state
      }

    default:
      return state
  }
}