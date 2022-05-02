import { useEffect } from 'react'

export default function useCloseModal(state, setState,  reference) {
  useEffect(() => {
    const checkIfClickedOutside = (event) => {
      if (state && reference.current && !reference.current.contains(event.target)) {
        setState(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [state])
}