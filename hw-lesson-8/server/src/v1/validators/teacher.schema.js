import { checkSchema } from 'express-validator'
import subjects from '../../../../client/src/features/subject/subjects.constants.js'
export const teacherSchema = checkSchema({
  fullName: {
    trim: true,
    notEmpty: { errorMessage: 'Імʼя викладача є обовʼязковим' },
    isLength: { options: { min: 2 }, errorMessage: 'Мінімум 2 символи' },
  },
  subject: {
    trim: true,
    notEmpty: { errorMessage: 'Предмет є обовʼязковим' },
    isIn: { options: [subjects], errorMessage: 'Невалідний предмет' },
  },
  photoBase64: {
    optional: true,
    custom: {
      options: value => {
        if (!value) return true
        const dataUriMatch =
          /^data:image\/(png|jpe?g|webp|gif);base64,[A-Za-z0-9+/=]+$/i
        const pureBase64Match = /^[A-Za-z0-9+/=]+$/
        if (!(dataUriMatch.test(value) || pureBase64Match.test(value)))
          throw new Error('Невалідний формат зображення (очікується base64)')
        const len = value.startsWith('data:')
          ? value.split(',')[1].length
          : value.length
        const approxBytes = (len * 3) / 4
        if (approxBytes > 1024 * 1024)
          throw new Error('Зображення занадто велике (>1MB)')
        return true
      },
    },
  },
})
