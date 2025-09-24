import { useNavigate } from 'react-router-dom'

/**
 * Простой хук для общих действий с сущностями
 * Упрощен после перехода на useConfirmModal
 */
export function useEntityActions(basePath) {
  const navigate = useNavigate()

  return {
    // Навигация
    view: (id) => navigate(`${basePath}/${id}`),
    edit: (id) => navigate(`${basePath}/${id}/edit`),
    create: () => navigate(`${basePath}/new`)
  }
}
