import React, { useContext, useEffect, useState } from 'react'
import style from './Background.module.sass'
import { AppContext } from '../../context/app.context'
import { getRandom } from '../../utils/getRandom';
import photoService from '../../services/photo.service';

export const Background = () => {
  const { location } = useContext(AppContext)
  const [backgroundImage, setBackgroundImage] = useState<string>()

  const fetchBGPhoto = async (location) => {
    if (location) {
      try {
        const { results } = await photoService.get({ query: location?.name })
        const index = getRandom(0, results.length - 1)
        setBackgroundImage(results[index].urls.regular)
      } catch (error) {}
    }
  }

  useEffect(() => {
    fetchBGPhoto(location)
  }, [location])

  return backgroundImage
    ? <div className={style.bg}>
        <img className={style.bg} src={backgroundImage} />
      </div>
    : <></>
}