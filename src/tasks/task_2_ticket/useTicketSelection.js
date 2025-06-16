import { useState } from 'react'

export const useTicketSelection = () => {
  const [state, setState] = useState({
    ticketClass: '',
    newspaper: '',
    cognac: false,
    snack: '',
    beerType: '',
    chips: '',
  })

  const updateTicketClass = ticketClass => {
    setState({
      ticketClass,
      newspaper: '',
      cognac: false,
      snack: '',
      beerType: '',
      chips: '',
    })
  }

  const updateSelection = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }))
  }

  return { state, updateTicketClass, updateSelection }
}
