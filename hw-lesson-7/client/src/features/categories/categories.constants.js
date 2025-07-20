export const CATEGORIES = [
  {
    id: 'tv',
    name: 'Телевізори',
    description: 'Сучасні телевізори різних діагоналей',
  },
  {
    id: 'laptops',
    name: 'Ноутбуки',
    description: 'Потужні ноутбуки для роботи та ігор',
  },
  {
    id: 'phones',
    name: 'Телефони',
    description: 'Смартфони останнього покоління',
  },
  {
    id: 'monitors',
    name: 'Монітори',
    description: "Якісні монітори для комп'ютерів",
  },
]

export const getCategoryById = id => {
  return CATEGORIES.find(category => category.id === id)
}

export const getCategoryName = id => {
  const category = getCategoryById(id)
  return category ? category.name : 'Невідома категорія'
}
