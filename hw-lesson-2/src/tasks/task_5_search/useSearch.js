import { SEARCH_RESULTS } from './constants.js'

export const useSearch = () => {
  return {
    results: SEARCH_RESULTS,
    totalResults: SEARCH_RESULTS.length,
  }
}
