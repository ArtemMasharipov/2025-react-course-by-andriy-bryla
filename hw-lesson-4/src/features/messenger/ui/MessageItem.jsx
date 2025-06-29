import { Button } from '../../../shared'

const formatTime = timestamp => {
  return new Date(timestamp).toLocaleTimeString('ua-UA', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function MessageItem({ message, onReaction, currentUser }) {
  const isCurrentUser = message.user === currentUser
  const reactions = message.reactions || {}
  const userReaction = reactions[currentUser]
  const likesCount = Object.values(reactions).filter(r => r === 'like').length
  const dislikesCount = Object.values(reactions).filter(r => r === 'dislike').length

  const handleLikeClick = () => onReaction(message.id, 'like')
  const handleDislikeClick = () => onReaction(message.id, 'dislike')

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-sm rounded-lg p-3 shadow-sm transition-shadow ${
        isCurrentUser
          ? 'bg-blue-500 text-white'
          : 'bg-white border border-gray-200 text-gray-800'
      }`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isCurrentUser
                ? 'bg-blue-700 text-white'
                : 'bg-gradient-to-r from-blue-400 to-purple-400 text-white'
            }`}>
              {message.user.charAt(0).toUpperCase()}
            </div>
            <span className={`font-semibold text-xs ${
              isCurrentUser ? 'text-blue-100' : 'text-gray-900'
            }`}>
              {message.user}
            </span>
          </div>
          <span className={`text-xs ${
            isCurrentUser ? 'text-blue-200' : 'text-gray-500'
          }`}>
            {formatTime(message.timestamp)}
          </span>
        </div>

        <p className={`mb-3 text-sm leading-relaxed ${
          isCurrentUser ? 'text-white' : 'text-gray-800'
        }`}>
          {message.text}
        </p>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleLikeClick}
            variant="outline"
            size="sm"
            className={`flex items-center gap-1 text-xs ${
              userReaction === 'like'
                ? isCurrentUser
                  ? 'text-pink-200 border-pink-300 bg-pink-500/20'
                  : 'text-green-600 border-green-200 bg-green-50'
                : isCurrentUser
                  ? 'text-blue-200 border-blue-300'
                  : 'text-gray-600'
            }`}
          >
            <span>👍</span>
            <span>{likesCount}</span>
          </Button>
          <Button
            onClick={handleDislikeClick}
            variant="outline"
            size="sm"
            className={`flex items-center gap-1 text-xs ${
              userReaction === 'dislike'
                ? isCurrentUser
                  ? 'text-red-200 border-red-300 bg-red-500/20'
                  : 'text-red-600 border-red-200 bg-red-50'
                : isCurrentUser
                  ? 'text-blue-200 border-blue-300'
                  : 'text-gray-600'
            }`}
          >
            <span>👎</span>
            <span>{dislikesCount}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
