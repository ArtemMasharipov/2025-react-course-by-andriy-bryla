import { createCrudApi } from '@shared/api'
import db from '@shared/config/firebase.config'

export const patientApi = createCrudApi({
  db,
  entity: 'Patient',
  collection: 'patients',
  cascadeDeleteCollections: ['appointments']
})

export const {
  useGetListQuery: useGetPatientsPaginatedQuery,
  useGetByIdQuery: useGetPatientQuery,
  useCreateMutation: useCreatePatientMutation,
  useUpdateMutation: useUpdatePatientMutation,
  useDeleteMutation: useDeletePatientMutation,
} = patientApi