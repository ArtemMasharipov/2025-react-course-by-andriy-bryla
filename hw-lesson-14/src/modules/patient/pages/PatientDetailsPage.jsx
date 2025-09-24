import { useDeletePatientMutation, useGetPatientQuery } from '@modules/patient/api/patient.api'
import { BackButton, ErrorPage } from '@shared/components'
import { ENTITY_CONFIG } from '@shared/config'
import { useConfirmModal, useEntityActions } from '@shared/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import PatientDetails from '../components/PatientDetails'

export default function PatientDetailsPage() {
  const config = ENTITY_CONFIG.patients
  const { patientId } = useParams()
  const navigate = useNavigate()
  const [deletePatient] = useDeletePatientMutation()
  
  const { data: patient, isLoading, error } = useGetPatientQuery(patientId, {
    skip: !patientId
  })
  
  const actions = useEntityActions(config.basePath)
  const [confirm, ConfirmModal] = useConfirmModal()
  
  const handleEdit = () => {
    navigate(`${config.basePath}/${patientId}/edit`)
  }
  
  const handleDelete = async () => {
    const patientName = patient ? patient.fullName : 'this patient'
    
    const confirmed = await confirm({
      title: 'Delete Patient',
      message: `Are you sure you want to delete ${patientName}? This action cannot be undone.`
    })
    
    if (confirmed) {
      try {
        await deletePatient({ id: patientId }).unwrap()
        navigate(config.basePath)
      } catch (error) {
        // console.error('Failed to delete patient:', error)
      }
    }
  }

  if (error) {
    return <ErrorPage error={error} backTo={config.basePath} entityName="patient" />
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BackButton to={config.basePath}>Back to Patients</BackButton>
      
      <PatientDetails
        patient={patient}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
      
      {ConfirmModal}
    </div>
  )
}
