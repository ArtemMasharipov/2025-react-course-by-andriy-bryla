import { debounce } from '@shared/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function useEntityList(queryHook, options = {}) {
  const {
    perPage = 10,
    searchField = null,
    minSearchChars = 2,
    debounceMs = 300,
    defaultSort = { field: 'createdAt', dir: 'desc' },
    entityName = 'items'
  } = options

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  const [cursors, setCursors] = useState([])
  const [currentCursor, setCurrentCursor] = useState(null)

  const [sort, setSort] = useState(defaultSort)

  const debouncedSetQuery = useMemo(
    () => debounce(setDebouncedQuery, debounceMs),
    [debounceMs]
  )

  useEffect(() => {
    return () => debouncedSetQuery.cancel?.()
  }, [debouncedSetQuery])

  useEffect(() => {
    debouncedSetQuery(searchQuery)
  }, [searchQuery, debouncedSetQuery])

  useEffect(() => {
    setCursors([])
    setCurrentCursor(null)
  }, [debouncedQuery, sort])

  const filters = useMemo(() => {
    const trimmedQuery = debouncedQuery.trim()
    if (!trimmedQuery || trimmedQuery.length < minSearchChars || !searchField) {
      return []
    }
    
    return [{
      field: searchField,
      op: 'startsWith',
      value: trimmedQuery.toLowerCase()
    }]
  }, [debouncedQuery, searchField, minSearchChars])

  const isSearching = filters.length > 0

  const activeSort = isSearching && searchField 
    ? { field: searchField, dir: 'asc' } 
    : sort

  const queryParams = useMemo(() => ({
    perPage: Math.max(1, perPage),
    sort: activeSort,
    filters,
    lastCursor: currentCursor
  }), [perPage, activeSort, filters, currentCursor])

  const { data, isLoading, error } = queryHook(queryParams)

  const items = data?.data || []
  const hasMore = data?.hasMore || false
  const nextCursor = data?.nextCursor

  const nextPage = useCallback(() => {
    if (nextCursor && hasMore) {
      setCursors(prev => [...prev, currentCursor || 'FIRST_PAGE'])
      setCurrentCursor(nextCursor)
    }
  }, [currentCursor, nextCursor, hasMore])

  const prevPage = useCallback(() => {
    if (cursors.length > 0) {
      const newCursors = cursors.slice(0, -1)
      setCursors(newCursors)
      const prevCursor = newCursors[newCursors.length - 1] || null
      setCurrentCursor(prevCursor === 'FIRST_PAGE' ? null : prevCursor)
    }
  }, [cursors])

  const toggleSort = useCallback((field) => {
    setSort(prev => ({
      field,
      dir: prev.field === field && prev.dir === 'asc' ? 'desc' : 'asc'
    }))
  }, [])

  const refresh = useCallback(() => {
    setCursors([])
    setCurrentCursor(null)
  }, [])

  const currentPage = cursors.length + 1
  const hasPrev = cursors.length > 0

  const searchProps = searchField ? {
    value: searchQuery,
    onChange: setSearchQuery,
    placeholder: `Search ${entityName}...`
  } : null

  const paginationProps = {
    hasNext: hasMore,
    hasPrev,
    onNext: nextPage,
    onPrev: prevPage,
    currentPage
  }

  return {
    items,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    isSearching,
    searchProps,
    hasMore,
    currentPage,
    nextPage,
    prevPage,
    paginationProps,
    sort,
    toggleSort,
    refresh
  }
}
