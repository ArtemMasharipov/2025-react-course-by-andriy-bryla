export const languageChannel = new BroadcastChannel('language-change')

export const changeLanguageWithSync = (language, i18n) => {
  try {
    // Change language locally first
    i18n.changeLanguage(language)
    
    // Broadcast to other tabs
    languageChannel.postMessage({
      type: 'LANGUAGE_CHANGE',
      language: language,
      timestamp: Date.now()
    })
  } catch (error) {
    // Failed to sync language change
    // Fallback to local change only
    i18n.changeLanguage(language)
  }
}

export const setupLanguageSync = (i18n) => {
  const handleMessage = (event) => {
    try {
      if (event.data?.type === 'LANGUAGE_CHANGE' && 
          event.data?.language && 
          event.data.language !== i18n.language) {
        i18n.changeLanguage(event.data.language)
      }
    } catch (error) {
      // Failed to handle language sync message
    }
  }

  languageChannel.addEventListener('message', handleMessage)
  
  // Return cleanup function
  return () => {
    languageChannel.removeEventListener('message', handleMessage)
  }
}
