import { useState } from 'react'
import {
  ERROR_MESSAGES,
  FORM_FIELDS,
  SPECIAL_USER,
  SUCCESS_EMOJI,
  SUCCESS_MESSAGE,
} from './constants.js'
import { validateCredentials } from './validation.js'

export const useLogin = () => {
  const [formData, setFormData] = useState({
    [FORM_FIELDS.LOGIN]: '',
    [FORM_FIELDS.PASSWORD]: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
    if (success) {
      setSuccess('')
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    const { login, password } = formData

    setTimeout(() => {
      if (validateCredentials(login, password)) {
        setSuccess(`${SUCCESS_MESSAGE} ${SUCCESS_EMOJI}`)
      } else {
        setError(ERROR_MESSAGES.INVALID_CREDENTIALS)
      }

      setIsLoading(false)
    }, 500)
  }

  const resetForm = () => {
    setFormData({
      [FORM_FIELDS.LOGIN]: '',
      [FORM_FIELDS.PASSWORD]: '',
    })
    setError('')
    setSuccess('')
  }
  const errorMessageType =
    formData[FORM_FIELDS.LOGIN] === SPECIAL_USER ? 'info' : 'error'

  return {
    formData,
    error,
    success,
    isLoading,
    errorMessageType,
    handleInputChange,
    handleSubmit,
    resetForm,
  }
}
