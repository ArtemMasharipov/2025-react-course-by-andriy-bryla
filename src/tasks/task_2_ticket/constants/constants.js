export const TICKET_CLASSES = {
  BUSINESS: 'business',
  ECONOMY: 'economy',
}

export const BUSINESS_OPTIONS = {
  newspapers: ['Financial Times', 'The Guardian', 'Wall Street Journal'],
  cognacs: ['Hennessy', 'Martell', 'Rémy Martin'],
  snacks: ['Nuts', 'Caviar', 'Cheese platter'],
}

export const ECONOMY_OPTIONS = {
  beers: ['Heineken', 'Corona', 'Stella Artois'],
  chips: ['Classic', 'BBQ', 'Cheese'],
}

export const BACKGROUNDS = {
  [TICKET_CLASSES.BUSINESS]:
    'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100',
  [TICKET_CLASSES.ECONOMY]:
    'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-100',
}

export const TICKET_CONFIG = {
  [TICKET_CLASSES.BUSINESS]: {
    newspapers: BUSINESS_OPTIONS.newspapers,
    backgroundClass: BACKGROUNDS[TICKET_CLASSES.BUSINESS],
    cloudinaryType: 'business',
    icon: '✈️',
    title: 'Business Class',
    subtitle: 'Premium Experience',
  },
  [TICKET_CLASSES.ECONOMY]: {
    beers: ECONOMY_OPTIONS.beers,
    chips: ECONOMY_OPTIONS.chips,
    backgroundClass: BACKGROUNDS[TICKET_CLASSES.ECONOMY],
    cloudinaryType: 'economy',
    icon: '✈️',
    title: 'Economy Class',
    subtitle: 'Comfortable Journey',
  },
}

export const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes, please' },
  { value: 'no', label: 'No, thank you' },
]

import {
  createSelectionClasses,
  THEME,
} from '../../../shared/constants/index.js'

export const getOptionCardClasses = isSelected => {
  return createSelectionClasses(
    isSelected,
    `p-4 rounded-xl border-2 cursor-pointer`,
    THEME.transition
  )
}

export const getOptionTextClasses = isSelected => {
  const baseClasses = `text-sm font-medium ${THEME.transition}`
  const selectedClasses = 'text-indigo-700'
  const defaultClasses = 'text-gray-700 group-hover:text-indigo-600'

  return `${baseClasses} ${isSelected ? selectedClasses : defaultClasses}`
}
