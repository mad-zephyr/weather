const CITY_IN_LOCAL_STORAGE = 'cityList'

export function addCityToLocalStorage(city) {
  let cityList = JSON.parse(localStorage.getItem(CITY_IN_LOCAL_STORAGE))

  if (!cityList) {
    cityList = []
  }

  cityList.push(city)
  localStorage.setItem(CITY_IN_LOCAL_STORAGE, JSON.stringify(cityList))
}

export function getCityFromLocalStorage() {
  const cityList = JSON.parse(localStorage.getItem(CITY_IN_LOCAL_STORAGE))

  if (cityList) {
    return cityList
  }

  return []
}
export function removeCityFromStorage(city) {
  const cityList = JSON.parse(localStorage.getItem(CITY_IN_LOCAL_STORAGE))

  const index = cityList.findIndex(item => item === city)
  cityList.splice(index, 1)

  localStorage.setItem(CITY_IN_LOCAL_STORAGE, JSON.stringify(cityList))
}