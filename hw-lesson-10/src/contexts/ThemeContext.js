import { createContext } from 'react'
import { DEFAULT_THEME } from '../shared/constants.js'

export const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  toggleTheme: () => {},
})
