import { CityProps } from '../context/city.reducer'

const Storage = {
  CITY_LIST: 'cityList'
}

export function addCityToLocalStorage(city: CityProps): void {
  const cityListRaw = localStorage.getItem(Storage.CITY_LIST)

  const cityList = cityListRaw 
    ? JSON.parse(cityListRaw)
    : []
  
  cityList.push(city)

  localStorage.setItem(Storage.CITY_LIST, JSON.stringify(cityList))
}

export function getCityFromLocalStorage() {
  try {
    const cityListRaw = localStorage.getItem(Storage.CITY_LIST)

    const  cityList = cityListRaw
      ? JSON.parse(cityListRaw)
      : []

    return cityList
  } catch(error) {}
}

export function removeCityFromStorage(city): void {
  const cityListRaw = localStorage.getItem(Storage.CITY_LIST)
  let cityList = cityListRaw && JSON.parse(cityListRaw)

  const index = cityList.findIndex(item => item.id === city.id)
  cityList.splice(index, 1)

  localStorage.setItem(Storage.CITY_LIST, JSON.stringify(cityList))
}

const localStorageService = {
  addCityToLocalStorage,
  getCityFromLocalStorage,
  removeCityFromStorage
}

export default localStorageService