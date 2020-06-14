/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useState, useContext, useMemo } from 'react'

export const BackgroundContext = createContext(null)

export function useBackground() {
  const context = useContext(BackgroundContext)

  if (!context) {
    throw new Error('Must be called within BackgroundContext Provider!')
  }

  return context
}

export function BackgroundProvider(props) {
  const [background, setBackground] = useState('')

  const value = useMemo(() => [background, setBackground], [background])

  return <BackgroundContext.Provider value={value} {...props} />
}

export default { useBackground, BackgroundProvider }
