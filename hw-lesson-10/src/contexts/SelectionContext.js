import { createContext } from 'react'

export const SelectionContext = createContext({
  selectedBuses: [],
  selectedHotels: [],
  toggleBus: () => {},
  toggleHotel: () => {},
  removeBus: () => {},
  removeHotel: () => {},
  clearAll: () => {},
})
