import { ImageUpload } from '@/shared/ui/ImageUpload'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function ProductForm({ product = {}, onSubmit }) {
  const { t } = useTranslation()
  const [name, setName] = useState(product?.name || '')
  const [price, setPrice] = useState(product?.price || 0)
  const [image, setImage] = useState(product?.image || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...product,
      name,
      price: Number(price),
      image,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-md mx-auto"
    >
      <input
        className="border rounded px-2 py-1"
        placeholder={t('products.name')}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border rounded px-2 py-1"
        placeholder={t('products.price')}
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <ImageUpload
        value={image}
        onChange={setImage}
        className="w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 mt-2"
      >
        {t('products.save')}
      </button>
    </form>
  )
}
