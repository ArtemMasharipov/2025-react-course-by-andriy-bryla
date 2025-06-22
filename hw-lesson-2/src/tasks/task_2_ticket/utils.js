import {
  createSelectionClasses,
  THEME,
} from '../../shared/constants/index.js'

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
