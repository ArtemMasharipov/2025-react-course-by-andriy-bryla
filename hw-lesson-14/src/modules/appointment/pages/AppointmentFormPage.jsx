import {
    useCreateAppointmentMutation,
    useGetAppointmentQuery,
    useUpdateAppointmentMutation
} from '@modules/appointment/api/appointment.api'
import AppointmentForm from '@modules/appointment/components/AppointmentForm'
import EntityFormPage from '@shared/components/EntityFormPage'

export default function AppointmentFormPage() {
  return (
    <EntityFormPage
      entityName="appointment"
      entityTitle="Appointment"
      paramName="appointmentId"
      basePath="/appointments"
      useGetQuery={useGetAppointmentQuery}
      useCreateMutation={useCreateAppointmentMutation}
      useUpdateMutation={useUpdateAppointmentMutation}
      FormComponent={AppointmentForm}
    />
  )
}
