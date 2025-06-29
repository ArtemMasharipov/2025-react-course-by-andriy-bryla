export const USERS = ['Анна', 'Богдан']

export const INITIAL_MESSAGES = [
  {
    id: 1,
    user: 'Анна',
    text: 'Привіт! Як справи?',
    timestamp: Date.now() - 300000,
    reactions: {},
  },
  {
    id: 2,
    user: 'Богдан',
    text: 'Привіт! Все добре, дякую! А у тебе як?',
    timestamp: Date.now() - 180000,
    reactions: { Анна: 'like' },
  },
  {
    id: 3,
    user: 'Анна',
    text: 'Теж все чудово! Працюю над новим проектом.',
    timestamp: Date.now() - 60000,
    reactions: { Богдан: 'like' },
  },
]
