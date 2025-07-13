import { ChevronDown, ChevronUp } from 'lucide-react'
import { memo } from 'react'
import { COLUMNS } from '../constants'

const GridHeader = memo(({ sortConfig, onSort }) => (
  <div className="flex bg-gray-100 border-b-2 border-gray-300 font-semibold sticky top-0 z-10">
    {COLUMNS.map(col => (
      <div
        key={col.key}
        className="px-3 py-3 text-sm cursor-pointer hover:bg-gray-200 flex items-center justify-between"
        style={{ width: `${col.width}px` }}
        onClick={() => onSort(col.key)}
      >
        <span>{col.title}</span>
        {sortConfig.key === col.key && (
          sortConfig.direction === 'asc' ?
            <ChevronUp className="w-4 h-4" /> :
            <ChevronDown className="w-4 h-4" />
        )}
      </div>
    ))}
  </div>
))

GridHeader.displayName = 'GridHeader'

export default GridHeader
