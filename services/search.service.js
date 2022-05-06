import httpService from './http.service'
const forecastEndpoint = '/search'

const locationWeatherService = {
  get: async (payload) => {
    const {
      data
    } = await httpService.get(forecastEndpoint, {
      params: payload
    })

    return data
  }
}
export default locationWeatherService