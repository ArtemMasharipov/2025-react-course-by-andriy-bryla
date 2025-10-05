import { useState } from 'react'

export const useDeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [onConfirm, setOnConfirm] = useState(null)

  const openModal = (deleteHandler) => {
    setOnConfirm(() => deleteHandler)
    setIsOpen(true)
  }

  const closeModal = () => {
    if (isLoading) return
    setIsOpen(false)
    setIsLoading(false)
    setOnConfirm(null)
  }

  const handleConfirm = async () => {
    if (!onConfirm) return

    setIsLoading(true)
    try {
      await onConfirm()
      closeModal()
    } catch (error) {
      console.error('Delete error:', error)
      setIsLoading(false)
    }
  }

  return {
    isOpen,
    isLoading,
    openModal,
    closeModal,
    handleConfirm
  }
}
