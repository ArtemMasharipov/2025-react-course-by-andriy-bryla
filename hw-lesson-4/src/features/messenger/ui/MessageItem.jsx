import { UIButton } from '../../../shared'
import { getMessageClasses, getReactionButtonClasses } from './styles'

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

  const classes = getMessageClasses(isCurrentUser)

  const handleLikeClick = () => onReaction(message.id, 'like')
  const handleDislikeClick = () => onReaction(message.id, 'dislike')

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={classes.container}>
        <div className="flex justify-between items-start mb-2 gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className={classes.avatar}>
              {message.user.charAt(0).toUpperCase()}
            </div>
            <span className={classes.username}>
              {message.user}
            </span>
          </div>
          <span className={classes.timestamp}>
            {formatTime(message.timestamp)}
          </span>
        </div>

        <p className={classes.text}>
          {message.text}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <UIButton
            onClick={handleLikeClick}
            variant="outline"
            size="sm"
            className={`flex items-center gap-1 text-xs px-2 py-1 sm:px-3 sm:py-1.5 ${
              getReactionButtonClasses(isCurrentUser, userReaction, 'like')
            }`}
          >
            <span>👍</span>
            <span>{likesCount}</span>
          </UIButton>
          <UIButton
            onClick={handleDislikeClick}
            variant="outline"
            size="sm"
            className={`flex items-center gap-1 text-xs px-2 py-1 sm:px-3 sm:py-1.5 ${
              getReactionButtonClasses(isCurrentUser, userReaction, 'dislike')
            }`}
          >
            <span>👎</span>
            <span>{dislikesCount}</span>
          </UIButton>
        </div>
      </div>
    </div>
  )
}
