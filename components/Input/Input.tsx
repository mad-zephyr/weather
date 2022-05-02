import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import AlertIcon from '../../assets/alert-icon.svg'
import SuccessIcon from '../../assets/ok-icon.svg'
import SeePassIcon from '../../assets/charm_eye.svg'
import HidePassIcon from '../../assets/charm_eye-slash.svg'

import style from './Input.module.sass'
import { InputProps } from './Input.props'

export const Input: React.FC<InputProps> = (props) => {
  const { label, inputType, value, classes, name, onChange, placeholder, error, touchInput } = props
  const [isSeePass, setIsSeePass] = useState('password')
  const [touched, setTouched] = useState(false)


  const handleChange = ({target}) => {
    onChange({ name: target.name, value: target.value })
  }

  useEffect(() => {
    if (touchInput) {
      handleBlur()
    }
  }, [touchInput])

  const handleBlur = () => {
    setTouched(true)
  }

  const handleSeePass = () => {
    setIsSeePass(prevState => {
      if (prevState === 'password') {
        return 'text'
      } else {
        return 'password'
      }
    })
  }

  const setPasswordIcon = () => {
    return isSeePass === 'text'
      ? <SeePassIcon style={{ cursor: 'pointer' }} onClick={handleSeePass} className={style.pass} />
      : <HidePassIcon style={{ cursor: 'pointer' }} onClick={handleSeePass} className={style.pass} />
  }

  const icon = error && touched
    ? <AlertIcon className={style.alert} />
    : !error && !touched
    ? <SuccessIcon className={style.success} />
    : <></>

  return (
    <div className={cn(style.input, {
      [style.input__outline]: classes,
      [style.input__error]: error && touched
    })}>
      <label htmlFor={name}> {label}
        <div className={style.input__wrapper}>
          <input
            onChange={handleChange}
            name={name}
            type={inputType === 'password' ? isSeePass : inputType }
            value={value[name]}
            placeholder={placeholder}
            onBlur={handleBlur}
          />
          <div className={style.icons}>
            {icon}
            {inputType === 'password' && setPasswordIcon()}
          </div>
        </div>
        {error && touched && <p className={style.error}>{ error }</p>}
      </label>
    </div>
  )
}

