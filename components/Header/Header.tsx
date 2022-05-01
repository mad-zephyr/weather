import React, { useEffect, useState, MouseEvent } from 'react'
import cn from 'classnames'
import style from './Header.module.sass'
import { useRef } from 'react'
import CloseIcon from './close.svg'

export const Header = () => {
  const [isOpen, setOpen] = useState(false)
  const headerModal = useRef<any>(null)
  const openHeader = (close = false) => {
    if (close) {
      setOpen(false)
      return
    }
    setOpen(true)
  }

  useEffect(() => {
    const checkIfClickedOutside = (event) => {
      if (isOpen && headerModal.current && !headerModal.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpen])

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
            HEADER
          </div>
        </div>
      </div>
    </div>
  )
}