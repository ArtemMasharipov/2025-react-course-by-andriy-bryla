import { useRef, useState } from 'react'

import { Button } from '../../../shared'

export default function MessageForm({ currentUser, onSubmit }) {
  const [messageText, setMessageText] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = messageText.trim()
    if (text) {
      onSubmit(text)
      setMessageText('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e) => setMessageText(e.target.value)

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        ref={inputRef}
        type="text"
        value={messageText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={`Повідомлення від ${currentUser}...`}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
        autoFocus
      />
      <Button
        type="submit"
        disabled={!messageText.trim()}
        className="px-6 py-3 font-medium"
      >
        Надіслати
      </Button>
    </form>
  )
}
