import { memo } from 'react'
import { Link } from 'react-router-dom'

/* ProductCard: Optimized presentational component for a single product item */
const ProductCard = memo(({ product, onDelete }) => {
  const { _id, name, price, createdAt } = product

  const handleDelete = () => onDelete?.(_id)

  const formattedPrice = `$${Number(price).toFixed(2)}`
  const formattedDate = new Date(createdAt).toLocaleDateString()

  return (
    <div
      className="group relative flex flex-col gap-3 rounded-xl border border-emerald-200 bg-gradient-to-br from-white to-emerald-50/60 p-4 shadow-sm ring-1 ring-emerald-900/5 transition hover:shadow-md dark:from-emerald-900/40 dark:to-emerald-900/10 dark:border-emerald-800/60"
      data-id={_id}
    >
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-emerald-800 line-clamp-2 dark:text-emerald-100 group-hover:underline decoration-emerald-400/60">
          {name}
        </h4>
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
          {formattedPrice}
        </p>
        <small className="text-[10px] uppercase tracking-wide text-emerald-400 dark:text-emerald-500">
          Added {formattedDate}
        </small>
      </div>
      <div className="mt-auto flex justify-between gap-3 pt-2">
        <Link
          to={`/products/edit/${_id}`}
          className="flex-1 rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-center text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-emerald-700 dark:bg-emerald-800/30 dark:text-emerald-200 dark:hover:bg-emerald-800/50"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="rounded-md border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-100 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-rose-400 dark:border-rose-600 dark:bg-rose-800/50 dark:text-rose-400 dark:hover:bg-rose-700/60"
          aria-label={`Delete ${name}`}
        >
          Delete
        </button>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-2 ring-emerald-400/40 transition group-hover:opacity-100" />
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
