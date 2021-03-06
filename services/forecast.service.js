import httpService from './http.service'
const forecastEndpoint = '/forecast'

const forecastService = {
  get: async (payload) => {
    const {
      data
    } = await httpService.get(
      forecastEndpoint, {
        params: payload
      }
    )

    return data
  }
}
export default forecastService