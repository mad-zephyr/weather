import axios from 'axios'
import configFile from '../config.json'

const http = axios.create({
  baseURL: configFile.UNSPLASH_ENDPOINT
})

http.interceptors.request.use(
  async function (config) {

      config.params = {
        ...config.params,
        client_id: configFile.UNSPLASH_ACCESS_KEY
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
}
export default httpService