import { useDeleteDoctorMutation, useGetDoctorQuery } from '@modules/doctor/api/doctor.api'
import { BackButton, ErrorPage } from '@shared/components'
import { ENTITY_CONFIG } from '@shared/config'
import { useConfirmModal, useEntityActions } from '@shared/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import DoctorDetails from '../components/DoctorDetails'

export default function DoctorDetailsPage() {
  const config = ENTITY_CONFIG.doctors
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const [deleteDoctor] = useDeleteDoctorMutation()
  
  const { data: doctor, isLoading, error } = useGetDoctorQuery(doctorId, {
    skip: !doctorId
  })
  
  const actions = useEntityActions(config.basePath)
  const [confirm, ConfirmModal] = useConfirmModal()
  
  const handleEdit = () => {
    navigate(`${config.basePath}/${doctorId}/edit`)
  }
  
  const handleDelete = async () => {
    const doctorName = doctor ? doctor.fullName : 'this doctor'
    
    const confirmed = await confirm({
      title: 'Delete Doctor',
      message: `Are you sure you want to delete ${doctorName}? This action cannot be undone.`
    })
    
    if (confirmed) {
      try {
        await deleteDoctor({ id: doctorId }).unwrap()
        navigate(config.basePath)
      } catch (error) {
        // console.error('Failed to delete doctor:', error)
      }
    }
  }

  if (error) {
    return <ErrorPage error={error} backTo={config.basePath} entityName="doctor" />
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BackButton to={config.basePath}>Back to Doctors</BackButton>
      
      <DoctorDetails
        doctor={doctor}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
      
      {ConfirmModal}
    </div>
  )
}
