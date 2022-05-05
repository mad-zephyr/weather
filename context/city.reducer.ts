import localStorageService from '../services/localStorage.service';

export enum CityEnum {
  deleteCity = 'CITY_DELETED',
  addCity = 'CITY_ADDED',
  setActiveCity = 'CITY_SETTED'
}

export type cityActions = { type: CityEnum.deleteCity } | { type: CityEnum.addCity } | { type: CityEnum.setActiveCity }

export interface CityReducerState {
  type: CityEnum
  payload: string
}

export interface CityStateProps{
  cityList: Array<string>
  activeCity: string
}

export const cityReducer = (state: CityStateProps, action: CityReducerState): CityStateProps => {
  const {type, payload} = action

  switch (type) {
    case CityEnum.addCity:
      localStorageService.addCityToLocalStorage(payload)
      return { ...state, cityList: [...state.cityList, payload] }

    case CityEnum.setActiveCity:
      return {
        ...state,
        activeCity: payload
      }

    case CityEnum.deleteCity:
      const index = state.cityList.findIndex(city => city === payload)
      state.cityList.splice(index, 1)
      localStorageService.removeCityFromStorage(payload)
      return {
        ...state
      }

    default:
      return state
  }
}