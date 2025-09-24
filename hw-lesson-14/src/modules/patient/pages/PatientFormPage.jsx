import {
    useCreatePatientMutation,
    useGetPatientQuery,
    useUpdatePatientMutation
} from '@modules/patient/api/patient.api'
import PatientForm from '@modules/patient/components/PatientForm'
import EntityFormPage from '@shared/components/EntityFormPage'

export default function PatientFormPage() {
  return (
    <EntityFormPage
      entityName="patient"
      entityTitle="Patient"
      paramName="patientId"
      basePath="/patients"
      useGetQuery={useGetPatientQuery}
      useCreateMutation={useCreatePatientMutation}
      useUpdateMutation={useUpdatePatientMutation}
      FormComponent={PatientForm}
    />
  )
}
