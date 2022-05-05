import React, {  useState, useRef, useContext, useReducer } from 'react'
import { AppContext } from '../../context/app.context'
import { HeaderProps } from './Header.props'
import useCloseModal from '../../hooks/useCloseModal'
import { Input } from '../Input/Input'
import CloseIcon from './close.svg'
import MinCloseIcon from '../../assets/close.svg'
import cn from 'classnames'

import style from './Header.module.sass'
import { CityEnum } from '../../context/city.reducer'

export const Header: React.FC = (): JSX.Element => {
  const { cityState, dispatch } = useContext(AppContext)
  const [isOpen, setOpen] = useState(false)
  const [inputValue, setInputvalue] = useState({city: ''})
  const headerModal = useRef<HTMLDivElement>(null)

  const showHeaderMenu = (event: React.SyntheticEvent, close: boolean): void => {
    event.stopPropagation()
    close
      ? setOpen(false)
      : setOpen(true)
  }

  useCloseModal(isOpen, setOpen, headerModal)

  const closeHeader = (event: React.SyntheticEvent) => showHeaderMenu(event, true)
  const openHeader = (event: React.SyntheticEvent) => showHeaderMenu(event, false)

  const handlerChange = (target) => {
    setInputvalue((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const handleCity = (event: React.SyntheticEvent, type: CityEnum, locationName: string) => {
    event.stopPropagation()

    switch (type) {
      case CityEnum.deleteCity:
        dispatch && dispatch({ type: CityEnum.deleteCity, payload: locationName })
        break
      case CityEnum.addCity:
        dispatch && dispatch({ type: CityEnum.addCity, payload: locationName }) 
        break
      case CityEnum.setActiveCity:
        dispatch && dispatch({ type: CityEnum.setActiveCity, payload: locationName }) 
        break
    }
  }

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
              <button
                onClick={(event) => handleCity(event, CityEnum.addCity, inputValue.city)}
                className={style.btn}>Add</button>
            </div>
            <hr className={style.hr} />
            <div className={cn(style.cityList, {[style.cityList__open]: isOpen})}>
              {cityState?.cityList?.map((city, index) => (
                <div
                  key={city + index}
                  className={style.city}
                  onClick={(event) => handleCity(event, CityEnum.setActiveCity, city)}
                >
                  {city} <MinCloseIcon onClick={(event) => handleCity(event, CityEnum.deleteCity, city)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}