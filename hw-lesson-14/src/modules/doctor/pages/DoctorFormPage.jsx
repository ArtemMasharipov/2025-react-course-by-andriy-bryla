import {
    useCreateDoctorMutation,
    useGetDoctorQuery,
    useUpdateDoctorMutation
} from '@modules/doctor/api/doctor.api'
import DoctorForm from '@modules/doctor/components/DoctorForm'
import EntityFormPage from '@shared/components/EntityFormPage'

export default function DoctorFormPage() {
  return (
    <EntityFormPage
      entityName="doctor"
      entityTitle="Doctor"
      paramName="doctorId"
      basePath="/doctors"
      useGetQuery={useGetDoctorQuery}
      useCreateMutation={useCreateDoctorMutation}
      useUpdateMutation={useUpdateDoctorMutation}
      FormComponent={DoctorForm}
    />
  )
}
