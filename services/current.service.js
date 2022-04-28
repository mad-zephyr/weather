import httpService from './http.service'
const currentEndpoint = '/current'

const currentWeatherService = {
  get: async (payload) => {
    const { data } = await httpService.get(
      currentEndpoint, {params: payload}
    )

    return data
  }
}
export default currentWeatherService
