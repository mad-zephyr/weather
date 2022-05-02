import React, { useEffect, useState, useRef } from 'react'
import style from './Header.module.sass'
import cn from 'classnames'
import { HeaderProps } from './Header.props'
import useCloseModal from '../../hooks/useCloseModal'
import { Input } from '../Input/Input'
import { addCityToLocalStorage, getCityFromLocalStorage, removeCityFromStorage } from '../../services/localStorage.service';
import CloseIcon from './close.svg'
import MinCloseIcon from '../../assets/close.svg'

export const Header: React.FC<HeaderProps> = ({setCity}):JSX.Element => {
  const [isOpen, setOpen] = useState(false)
  const [inputValue, setInputvalue] = useState({city: ''})
  const [cityList, setCityList] = useState<Array<string>>([])
  const headerModal = useRef<any>(null)

  useEffect(() => {
    const cityList = getCityFromLocalStorage()
    setCityList(cityList)
  }, [])
  const openHeader = (close = false) => {
    if (close) {
      setOpen(false)
      return
    }
    setOpen(true)
  }

  const handlerChange = (target) => {
    setInputvalue((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const hadleActiveCity = (locationName) => {
    setCity(locationName)
  }

  useCloseModal(isOpen, setOpen, headerModal)

  const addCityToStorage = (cityName) => {
    setCityList(prevState => [...prevState, cityName])
    addCityToLocalStorage(cityName)
    setInputvalue(prevState => ({
      ...prevState,
      city: ''
    }))

  }
  const deleteCityFromStorage = (cityName) => {
    const index = cityList.findIndex(item => item === cityName)
    cityList.splice(index, 1) 
    setCityList([...cityList])
    removeCityFromStorage(cityName)
  }

  return (
    <div className={style.header}>
      <div className={style.container}>
        <div
          ref={headerModal}
          onClick={(event) => {
            event.stopPropagation()
            openHeader(false)
          }}
          className={cn(style.wrapper, {
            [style.wrapper__open]: isOpen 
          })}
        >
          <div
            onClick={(event) =>  {
              event.stopPropagation()
              openHeader(true)
            }}
            className={style.close}>
            <CloseIcon/>
          </div>
          <div
            className={cn(style.content, {
            [style.content__open]: isOpen 
          })}>
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
              <button
                onClick={() => addCityToStorage(inputValue.city)}
                className={style.btn}>Add</button>
            </div>
            <hr className={style.hr} />
            <div className={style.cityList}>
              {cityList?.map((city, index) => {
                return <div
                  key={city + index}
                  className={style.city}
                  onClick={() => hadleActiveCity(city)}
                >
                  {city} <MinCloseIcon onClick={(event) => {
                    event.stopPropagation()
                    deleteCityFromStorage(city)
                  }} />
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}