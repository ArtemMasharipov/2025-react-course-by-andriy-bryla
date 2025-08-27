import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProductById, selectProductsError } from '../model/selectors'
import { addProductThunk, updateProductThunk } from '../model/thunks'

const ProductForm = ({ productId = null, onClose = null }) => {
  const dispatch = useDispatch()
  const error = useSelector(selectProductsError)
  const existingProduct = useSelector(state => productId ? selectProductById(state, productId) : null)
  const [formData, setFormData] = useState({ name: '', price: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditMode = !!productId

  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        price: existingProduct.price?.toString() || ''
      })
    } else {
      setFormData({ name: '', price: '' })
    }
  }, [isEditMode, existingProduct])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 1 &&
      formData.name.trim().length <= 100 &&
      formData.price !== '' &&
      Number(formData.price) >= 0 &&
      !isNaN(Number(formData.price))
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isFormValid()) return
    setIsSubmitting(true)
    try {
      if (isEditMode) {
        await dispatch(updateProductThunk({
          id: productId,
          name: formData.name.trim(),
          price: Number(formData.price),
        })).unwrap()
        onClose && onClose()
      } else {
        await dispatch(addProductThunk({
          name: formData.name.trim(),
          price: Number(formData.price),
        })).unwrap()
        onClose && onClose()
      }
    } catch { /* error handled in slice */ } finally { setIsSubmitting(false) }
  }

  return (
  <div className="rounded-xl border border-emerald-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm dark:border-emerald-800 dark:bg-emerald-900/30">
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="space-y-5">
          <legend className="sr-only">{isEditMode ? 'Edit product fields' : 'Add product fields'}</legend>
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Organic Matcha"
              maxLength={100}
              required
              className="input border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/30 dark:border-emerald-700 dark:bg-emerald-900/40"
            />
            <small className="block text-[10px] font-medium text-emerald-500/80">{formData.name.length}/100</small>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="price" className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">Price</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-500">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                className="input pl-6 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/30 dark:border-emerald-700 dark:bg-emerald-900/40"
              />
            </div>
          </div>
        </fieldset>
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/20">
            {error}
          </div>
        )}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className="btn bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600"
          >
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Adding...'
              : isEditMode
                ? 'Update Product'
                : 'Add Product'}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary border-emerald-300 text-emerald-700 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-800/40"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ProductForm
