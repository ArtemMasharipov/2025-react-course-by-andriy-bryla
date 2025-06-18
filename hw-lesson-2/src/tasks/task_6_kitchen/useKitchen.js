import { nanoid } from 'nanoid'
import { useState } from 'react'
import { ORDER_STATUS } from './constants.js'

export const useKitchen = () => {
  const [newDish, setNewDish] = useState('')
  const [orders, setOrders] = useState([])

  const addOrder = () => {
    if (newDish.trim()) {
      const order = {
        id: nanoid(),
        dish: newDish.trim(),
        status: ORDER_STATUS.WAITING,
        createdAt: new Date().toLocaleTimeString(),
      }
      setOrders(prev => [...prev, order])
      setNewDish('')
    }
  }

  const moveOrder = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  const removeOrder = orderId => {
    setOrders(prev => prev.filter(order => order.id !== orderId))
  }

  const getOrdersByStatus = status => {
    return orders.filter(order => order.status === status)
  }

  const handleSubmit = e => {
    e.preventDefault()
    addOrder()
  }

  return {
    newDish,
    setNewDish,
    orders,
    addOrder,
    moveOrder,
    removeOrder,
    getOrdersByStatus,
    handleSubmit,
  }
}
