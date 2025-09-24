import { createCrudApi } from '@shared/api'
import db from '@shared/config/firebase.config'

export const appointmentApi = createCrudApi({
  db,
  entity: 'Appointment',
  collection: 'appointments'
})

export const {
  useGetListQuery: useGetAppointmentsPaginatedQuery,
  useGetByIdQuery: useGetAppointmentQuery,
  useCreateMutation: useCreateAppointmentMutation,
  useUpdateMutation: useUpdateAppointmentMutation,
  useDeleteMutation: useDeleteAppointmentMutation,
} = appointmentApi