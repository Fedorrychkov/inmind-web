import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  PropsWithChildren,
  useContext,
} from 'react'

export type WindowBoundsValue = {
  width: number
  height: number
}

export const windowBoundsContext = createContext<WindowBoundsValue | null>(null)

function getBounds(): WindowBoundsValue {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export function WindowBoundsProvider(props: PropsWithChildren<{}>) {
  const [bounds, setBounds] = useState(getBounds())

  const handleChange = useCallback(() => {
    setBounds(getBounds())
  }, [setBounds])

  useEffect(() => {
    window.addEventListener('resize', handleChange)

    return () => {
      window.removeEventListener('resize', handleChange)
    }
  }, [handleChange])

  return (
    <windowBoundsContext.Provider value={bounds} {...props} />
  )
}

export function useWindowBounds() {
  const context = useContext(windowBoundsContext)
  if (!context) {
    throw new Error('WindowBoundsContext value is not provided')
  }
  return context
}
