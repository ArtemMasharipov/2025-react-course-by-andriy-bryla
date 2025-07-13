import { useCallback, useDeferredValue, useMemo, useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import { generateTestData, VIRTUALIZATION_CONFIG } from '../constants'
import { filterData, sortData } from '../utils/dataUtils'
import GridHeader from './GridHeader'
import GridRow from './GridRow'
import SearchInput from './SearchInput'

const DataGrid = ({
  itemHeight = VIRTUALIZATION_CONFIG.DEFAULT_ITEM_HEIGHT,
  containerHeight = VIRTUALIZATION_CONFIG.DEFAULT_CONTAINER_HEIGHT,
  overscanCount = VIRTUALIZATION_CONFIG.DEFAULT_OVERSCAN_COUNT,
  recordsCount = 10000
}) => {
  const [data] = useState(() => generateTestData(recordsCount))
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' })

  const deferredQuery = useDeferredValue(searchQuery)
  const deferredSort = useDeferredValue(sortConfig)

  const processedData = useMemo(() => {
    const filtered = filterData(data, deferredQuery)
    return sortData(filtered, deferredSort)
  }, [data, deferredQuery, deferredSort])

  const visibleItemsCount = Math.min(Math.ceil(containerHeight / itemHeight), processedData.length)

  const handleSearch = (e) => setSearchQuery(e.target.value)

  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }, [])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            DataGrid ({processedData.length.toLocaleString()} записів)
          </h1>
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Пошук по всім полям..."
          />
        </div>

        <div className="relative">
          <GridHeader sortConfig={sortConfig} onSort={handleSort} />

          <div className="border-t border-gray-300">
            <List
              height={containerHeight}
              itemCount={processedData.length}
              itemSize={itemHeight}
              itemData={processedData}
              overscanCount={overscanCount}
              className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {GridRow}
            </List>
          </div>
        </div>

        <div className="p-4 bg-gray-50 text-sm text-gray-600 border-t">
          Показано {visibleItemsCount} з{' '}
          {processedData.length.toLocaleString()} записів
          {searchQuery && ` (фільтр: "${searchQuery}")`}
        </div>
      </div>
    </div>
  )
}

export default DataGrid
