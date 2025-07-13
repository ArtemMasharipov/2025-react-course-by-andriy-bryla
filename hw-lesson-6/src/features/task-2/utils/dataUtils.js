export const filterData = (data, query) => {
  if (!query) return data
  const q = query.toLowerCase()
  return data.filter(item =>
    Object.values(item).some(val => String(val).toLowerCase().includes(q))
  )
}

export const sortData = (data, { key, direction = 'asc' }) => {
  if (!key) return data
  const dir = direction === 'asc' ? 1 : -1

  return [...data].sort((a, b) => {
    const aVal = a[key],
      bVal = b[key]

    if (aVal == null && bVal == null) return 0
    if (aVal == null) return 1
    if (bVal == null) return -1

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * dir
    }

    return (
      String(aVal).localeCompare(String(bVal), 'en', {
        numeric: true,
        sensitivity: 'base',
      }) * dir
    )
  })
}
