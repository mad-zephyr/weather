import { useEffect } from 'react'

export default function useInterval(handler, timer = 1000) {
  useEffect(() => {
    const interval = setInterval(handler, timer)

    return function cleanup() {
      window.clearInterval(interval)
    }
  })
}
