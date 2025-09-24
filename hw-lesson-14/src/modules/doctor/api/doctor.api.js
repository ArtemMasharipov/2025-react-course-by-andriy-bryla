import { createCrudApi } from '@shared/api'
import db from '@shared/config/firebase.config'

export const doctorApi = createCrudApi({
  db,
  entity: 'Doctor',
  collection: 'doctors',
  cascadeDeleteCollections: ['appointments']
})

export const {
  useGetListQuery: useGetDoctorsPaginatedQuery,
  useGetByIdQuery: useGetDoctorQuery,
  useCreateMutation: useCreateDoctorMutation,
  useUpdateMutation: useUpdateDoctorMutation,
  useDeleteMutation: useDeleteDoctorMutation,
} = doctorApi