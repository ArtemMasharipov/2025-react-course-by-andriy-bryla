import { useState } from 'react'

export default function AppForm({ 
  onSubmit, 
  initialData = {}, 
  children,
  className = '' 
}) {
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(data, setErrors)
  }

  const updateField = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {typeof children === 'function' 
        ? children(data, updateField, errors)
        : children
      }
    </form>
  )
}
