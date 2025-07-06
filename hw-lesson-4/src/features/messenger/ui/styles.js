export const getMessageClasses = isCurrentUser => ({
  container: `max-w-sm w-full sm:max-w-sm rounded-lg p-3 shadow-sm transition-shadow ${
    isCurrentUser
      ? 'bg-blue-500 text-white'
      : 'bg-white border border-gray-200 text-gray-800'
  } sm:w-auto`,

  avatar: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
    isCurrentUser
      ? 'bg-blue-700 text-white'
      : 'bg-gradient-to-r from-blue-400 to-purple-400 text-white'
  }`,

  username: `font-semibold text-xs ${
    isCurrentUser ? 'text-blue-100' : 'text-gray-900'
  }`,

  timestamp: `text-xs ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'}`,

  text: `mb-3 text-sm leading-relaxed break-words ${
    isCurrentUser ? 'text-white' : 'text-gray-800'
  }`,
})

export const getReactionButtonClasses = (
  isCurrentUser,
  userReaction,
  reactionType
) => {
  const isActive = userReaction === reactionType

  if (isActive) {
    return isCurrentUser
      ? reactionType === 'like'
        ? 'text-pink-200 border-pink-300 bg-pink-500/20'
        : 'text-red-200 border-red-300 bg-red-500/20'
      : reactionType === 'like'
      ? 'text-green-600 border-green-200 bg-green-50'
      : 'text-red-600 border-red-200 bg-red-50'
  }

  return isCurrentUser ? 'text-blue-200 border-blue-300' : 'text-gray-600'
}
