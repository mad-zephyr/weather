import React, { useState, useRef, useContext, useCallback, useEffect, FunctionComponentElement } from 'react'
import { AppContext } from '../../context/app.context'
import useCloseModal from '../../hooks/useCloseModal'
import { Input } from '../Input/Input'
import CloseIcon from './close.svg'
import MinCloseIcon from '../../assets/close.svg'
import cn from 'classnames'

import style from './Header.module.sass'
import { CityEnum, CityProps } from '../../context/city.reducer'
import locationWeatherService from '../../services/search.service'
import { PossibleLocation } from '../../interfaces/variationLocation'
import useDebounce from '../../hooks/useDebounce'

export const Header: React.FC = (): JSX.Element => {
  const { cityState, dispatch } = useContext(AppContext)
  const [availableLocation, setAvailableLocation] = useState<Array<PossibleLocation>>([])
  const [isOpen, setOpen] = useState(false)
  const [inputValue, setInputvalue] = useState({city: ''})
  const headerModal = useRef<HTMLDivElement>(null)
  const dropDown = useRef<HTMLDivElement>(null)
  const FLAG_ENDPOINT = 'https://countryflagsapi.com/svg'



  const showHeaderMenu = (event: React.SyntheticEvent, close: boolean): void => {
    event.stopPropagation()
    close
      ? setOpen(false)
      : setOpen(true)
  }

  useCloseModal(isOpen, setOpen, headerModal)
  useCloseModal(availableLocation, setAvailableLocation, dropDown)

  const closeHeader = (event: React.SyntheticEvent) => showHeaderMenu(event, true)
  const openHeader = (event: React.SyntheticEvent) => showHeaderMenu(event, false)

  const handlerChange = (target) => {
    setInputvalue((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const handleCity = (event: React.SyntheticEvent, type: CityEnum, locationName: CityProps) => {
    event.stopPropagation()

    switch (type) {
      case CityEnum.deleteCity:
        dispatch && dispatch({ type: CityEnum.deleteCity, payload: locationName })
        break
      case CityEnum.addCity:
        dispatch && dispatch({ type: CityEnum.addCity, payload: locationName })
        dispatch && dispatch({ type: CityEnum.setActiveCity, payload: locationName }) 
        setInputvalue(prevState => ({ ...prevState, city: '' }))
        setAvailableLocation([])
        break
      case CityEnum.setActiveCity:
        dispatch && dispatch({ type: CityEnum.setActiveCity, payload: locationName }) 
        break
    }
  }

  const getLocation = async (params: {q: string}) => {
    try {
      const data = await locationWeatherService.get(params)
      setAvailableLocation(data)
    } catch (error) {}
  }

  const getLocationDebounced = useDebounce(getLocation, 500)

  useEffect(() => {
    inputValue.city.length &&  getLocationDebounced({q: inputValue.city})
  }, [inputValue.city])
  
  return (
    <div className={style.header}>
      <div className={style.container}>
        <div
          ref={headerModal}
          onClick={openHeader}
          className={cn(style.wrapper, { [style.wrapper__open]: isOpen })}
        >
          <div className={style.close} onClick={closeHeader}>
            <CloseIcon/>
          </div>
          <div className={cn(style.content, {[style.content__open]: isOpen })}>
            <div className={style.title}>Choose City:</div>
            <div className={style.form}>
              <Input
                label="Type City or Region"
                name="city"
                error=""
                placeholder="Type city name"
                inputType="text"
                value={inputValue}
                onChange={handlerChange}
              />
              {availableLocation.length > 0 && <div ref={dropDown} className={style.variation}>
                {availableLocation.map((city, index) => {
                  return <>
                    <div
                      key={city.id + index}
                      onClick={(event) => handleCity(event, CityEnum.addCity, city)}
                      className={style.variation__places}
                    >
                      <img src={`${FLAG_ENDPOINT}/${city.country}`} alt={city.country} />
                      <span>{city.name} </span> <span>/ {city.country}</span>
                    </div>
                  </>
              })}
              </div>}
            </div>
            <hr className={style.hr} />
            <div className={cn(style.cityList, {[style.cityList__open]: isOpen})}>
              {cityState?.cityList?.map((city, index) => (
                <div
                  key={city.id + index}
                  className={style.city}
                  onClick={(event) => handleCity(event, CityEnum.setActiveCity, city)}
                >
                  {city.name} <MinCloseIcon onClick={(event) => handleCity(event, CityEnum.deleteCity, city)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}