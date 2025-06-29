import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { TASKS } from '../../app/constants'
import { Button, Card, TaskDescription, useLocalStorage } from '../../shared'

import { INITIAL_MESSAGES, USERS } from './constants'
import { MessageForm, MessageList, UserSwitcher } from './ui'

const createMessage = (user, text) => ({
  id: uuidv4(),
  user,
  text,
  timestamp: Date.now(),
  reactions: {}
})

const updateMessageReactions = (message, currentUser, reactionType) => {
  const reactions = { ...message.reactions }
  const currentReaction = reactions[currentUser]

  if (currentReaction === reactionType) {
    delete reactions[currentUser]
  } else {
    reactions[currentUser] = reactionType
  }

  return { ...message, reactions }
}

export default function MessengerApp() {
  const [currentUser, setCurrentUser] = useState(USERS[0])
  const [messages, setMessages] = useLocalStorage('messenger-messages', INITIAL_MESSAGES)

  const taskInfo = TASKS.find(task => task.id === 'messenger')

  const handleSendMessage = (text) => {
    const newMessage = createMessage(currentUser, text)
    setMessages(prev => [...prev, newMessage])
  }

  const handleReaction = (messageId, reactionType) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? updateMessageReactions(msg, currentUser, reactionType)
          : msg
      )
    )
  }

  const handleClearMessages = () => setMessages([])
  const handleResetToDefault = () => setMessages(INITIAL_MESSAGES)

  return (
    <div className="space-y-6">
      <TaskDescription
        title={taskInfo.title}
        description={taskInfo.description}
        requirements={taskInfo.requirements}
      />

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Месенджер
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={handleResetToDefault}
              variant="outline"
              size="sm"
            >
              Скинути
            </Button>
            <Button
              onClick={handleClearMessages}
              variant="outline"
              size="sm"
              disabled={messages.length === 0}
            >
              Очистити чат
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <UserSwitcher
            currentUser={currentUser}
            onUserChange={setCurrentUser}
          />

          <MessageList
            messages={messages}
            onReaction={handleReaction}
            currentUser={currentUser}
          />

          <MessageForm
            currentUser={currentUser}
            onSubmit={handleSendMessage}
          />
        </div>
      </Card>
    </div>
  )
}
