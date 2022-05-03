import httpService from './http_photo.service'
const searchPhotoEndpoint = '/search/photos'

const photoService = {
  get: async (payload) => {
    const {
      data
    } = await httpService.get(
      searchPhotoEndpoint, {
        params: payload
      }
    )
    return data
  }
}
export default photoService