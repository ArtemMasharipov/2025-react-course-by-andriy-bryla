import { useLayoutEffect, useRef } from 'react'
import MessageItem from './MessageItem'

export default function MessageList({ messages, onReaction, currentUser }) {
  const messagesContainerRef = useRef(null)
  const prevMessagesLengthRef = useRef(0)

  useLayoutEffect(() => {
    if (
      messages.length > prevMessagesLengthRef.current &&
      messagesContainerRef.current
    ) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
    prevMessagesLengthRef.current = messages.length
  }, [messages])

  if (!messages.length) {
    return (
      <div className="text-center text-gray-500 py-12">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-lg font-medium">Повідомлень поки немає</p>
        <p className="text-sm mt-1">Надішліть перше повідомлення!</p>
      </div>
    )
  }

  return (
    <div ref={messagesContainerRef} className="space-y-3 max-h-80 overflow-y-auto pr-2 w-full sm:w-auto">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          onReaction={onReaction}
          currentUser={currentUser}
        />
      ))}
    </div>
  )
}
