import httpService from './http_photo.service'
const searchPhotoEndpoint = '/search/photos'
// &q=London&days=1

const photoService = {
  get: async (payload) => {
    const {
      data
    } = await httpService.get(
      searchPhotoEndpoint, {
        params: payload
      }
    )

    console.log(data)

    return data
  }
}
export default photoService