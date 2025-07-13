import { memo } from 'react'
import { COLUMNS } from '../constants'

const GridRow = memo(({ index, style, data }) => {
  const item = data[index]

  if (!item) return null

  return (
    <div
      className="flex border-b border-gray-200 hover:bg-gray-50 items-center"
      style={style}
    >
      {COLUMNS.map(col => (
        <div
          key={col.key}
          className="px-3 py-2 text-sm truncate flex items-center"
          style={{ width: `${col.width}px` }}
        >
          {col.key === 'salary' ? `$${item[col.key].toLocaleString()}` : item[col.key]}
        </div>
      ))}
    </div>
  )
})

GridRow.displayName = 'GridRow'

export default GridRow
