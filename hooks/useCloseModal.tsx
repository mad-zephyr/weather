import { useEffect } from 'react'

export default function useCloseModal(state, setState, reference, exact = false) {
  useEffect(() => {
    const checkIfClickedOutside = (event) => {
      if (state && reference.current && !reference.current.contains(event.target)) {
        setState(exact)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [state])
}