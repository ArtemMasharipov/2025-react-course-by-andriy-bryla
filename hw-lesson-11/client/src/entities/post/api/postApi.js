import axios from 'axios'
import { API_ENDPOINTS } from '../../../shared/config/api'

export const postApi = {
  list: () => axios.get(API_ENDPOINTS.POSTS),
}
