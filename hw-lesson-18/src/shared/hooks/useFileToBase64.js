import { useState } from 'react'

export const useFileToBase64 = (initialValue = '', onChange) => {
  const [value, setValue] = useState(initialValue)

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const base64 = await convertFileToBase64(file)
      setValue(base64)
      onChange?.(base64)
    } catch (error) {
      console.error('Error converting file to base64:', error)
    }
  }

  const handleRemove = () => {
    setValue('')
    onChange?.('')
  }

  return {
    value,
    handleFileSelect,
    handleRemove
  }
}
