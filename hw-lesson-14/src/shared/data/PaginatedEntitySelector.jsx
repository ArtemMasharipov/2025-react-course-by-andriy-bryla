import { useCallback, useEffect, useRef, useState } from 'react'
import { LoadingSpinner } from '../ui/LoadingSpinner'

/**
 * Элегантный селектор с пагинированным скроллингом
 * Без поиска - только пагинация по скроллу
 */
export default function PaginatedEntitySelector({
  value,
  onChange,
  placeholder = 'Select...',
  useQueryHook,
  getLabel,
  getKey = (item) => item.id,
  perPage = 20,
  className = '',
  error,
  required = false
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [cursors, setCursors] = useState([])
  const [currentCursor, setCurrentCursor] = useState(null)
  const [allItems, setAllItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  
  const dropdownRef = useRef(null)
  const listRef = useRef(null)
  const observerRef = useRef(null)

  // Загружаем данные
  const { data, isLoading, error: queryError } = useQueryHook({
    lastCursor: currentCursor,
    perPage,
    sort: { field: 'createdAt', dir: 'desc' }
  })

  // Обновляем список при получении новых данных
  useEffect(() => {
    if (data?.data) {
      if (currentCursor === null) {
        // Первая загрузка
        setAllItems(data.data)
      } else {
        // Догрузка
        setAllItems(prev => [...prev, ...data.data])
      }
    }
  }, [data, currentCursor])

  // Ищем выбранный элемент при изменении value
  useEffect(() => {
    if (value && allItems.length > 0) {
      const item = allItems.find(item => getKey(item) === value)
      setSelectedItem(item || null)
    } else {
      setSelectedItem(null)
    }
  }, [value, allItems, getKey])

  // Intersection Observer для бесконечного скролла
  const lastItemRef = useCallback((node) => {
    if (isLoading) return
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && data?.hasMore && data?.nextCursor) {
        setCurrentCursor(data.nextCursor)
      }
    }, {
      threshold: 0.1, // Срабатывает когда 10% элемента видно
      rootMargin: '20px' // Загружает заранее
    })
    
    if (node) observerRef.current.observe(node)
  }, [isLoading, data?.hasMore, data?.nextCursor])

  // Закрытие по клику вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item) => {
    setSelectedItem(item)
    onChange(getKey(item), item)
    setIsOpen(false)
  }

  const handleToggle = () => {
    const wasOpen = isOpen
    setIsOpen(prev => !prev)
    
    if (!wasOpen) {
      // Открываем селектор
      if (allItems.length === 0) {
        // Первая загрузка
        setCurrentCursor(null)
      }
    }
  }

  // Сброс данных при закрытии (для экономии памяти)
  useEffect(() => {
    if (!isOpen && allItems.length > perPage * 3) {
      // Если загружено больше 3 страниц, очищаем кэш
      const timer = setTimeout(() => {
        setAllItems([])
        setCursors([])
        setCurrentCursor(null)
      }, 1000) // Задержка для плавности
      
      return () => clearTimeout(timer)
    }
  }, [isOpen, allItems.length, perPage])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Кнопка селектора */}
      <button
        type="button"
        onClick={handleToggle}
        className={`
          w-full px-3 py-2 text-left bg-white border rounded-lg
          flex items-center justify-between
          transition-all duration-150
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }
          ${isOpen ? 'ring-2 ring-opacity-50' : ''}
          hover:border-gray-400 focus:outline-none focus:ring-2
        `}
      >
        <span className={selectedItem ? 'text-gray-900' : 'text-gray-500'}>
          {selectedItem ? getLabel(selectedItem) : placeholder}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-lime-200 rounded-lg shadow-lg shadow-lime-200/30">
          <div 
            ref={listRef}
            className="max-h-60 overflow-auto"
          >
            {allItems.length === 0 && isLoading ? (
              <div className="px-3 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <LoadingSpinner size="sm" variant="blue" />
                  Loading options...
                </div>
              </div>
            ) : allItems.length === 0 ? (
              <div className="px-3 py-4 text-gray-500 text-center">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-6m-4 0h-6m4 0v6" />
                  </svg>
                  No options available
                </div>
              </div>
            ) : (
              <>
                {allItems.map((item, index) => {
                  const isSelected = selectedItem && getKey(selectedItem) === getKey(item)
                  const isLast = index === allItems.length - 1
                  
                  return (
                    <div
                      key={getKey(item)}
                      ref={isLast && data?.hasMore ? lastItemRef : null}
                      onClick={() => handleSelect(item)}
                      className={`
                        px-3 py-2 cursor-pointer transition-colors duration-150
                        ${isSelected 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'hover:bg-gray-50 text-gray-900'
                        }
                        ${index === 0 ? 'rounded-t-lg' : ''}
                        ${isLast && !data?.hasMore && !isLoading ? 'rounded-b-lg' : ''}
                      `}
                    >
                      {getLabel(item)}
                    </div>
                  )
                })}
                
                
                {/* Индикатор конца списка */}
                {!isLoading && allItems.length > 0 && !data?.hasMore && (
                  <div className="px-3 py-1 text-center bg-gray-50 border-t border-gray-100 rounded-b-lg">
                    <div className="text-xs text-gray-400">
                      End of list ({allItems.length} items)
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Ошибка */}
      {(error || queryError) && (
        <div className="mt-1 text-sm text-red-600">
          {error || 'Failed to load options'}
        </div>
      )}
    </div>
  )
}
