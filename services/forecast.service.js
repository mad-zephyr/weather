import httpService from './http.service'
const forecastEndpoint = '/forecast'
// &q=London&days=1

const forecastService = {
  get: async (payload) => {
    const { data } = await httpService.get(
      forecastEndpoint, {params: payload}
    )

    return data
  }
}
export default forecastService
