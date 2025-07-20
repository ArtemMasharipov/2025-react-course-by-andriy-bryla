import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Назва товару обов'язкова"],
      trim: true,
      maxlength: [100, 'Назва не може бути довше 100 символів'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Опис не може бути довше 500 символів'],
    },
    price: {
      type: Number,
      required: [true, "Ціна товару обов'язкова"],
      min: [0, "Ціна не може бути від'ємною"],
    },
    categoryId: {
      type: String,
      required: [true, "ID категорії обов'язковий"],
      enum: ['tv', 'laptops', 'phones', 'monitors'],
    },
    images: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return /^https?:\/\/.+/.test(v)
          },
          message: 'Зображення має бути валідним URL',
        },
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// Індекси для оптимізації запитів
productSchema.index({ categoryId: 1, inStock: 1 })
productSchema.index({ createdAt: -1 })

export default mongoose.model('Product', productSchema)
