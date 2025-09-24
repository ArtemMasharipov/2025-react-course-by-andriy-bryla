import { useDeleteAppointmentMutation, useGetAppointmentQuery } from '@modules/appointment/api/appointment.api'
import { BackButton, ErrorPage } from '@shared/components'
import { ENTITY_CONFIG } from '@shared/config'
import { useConfirmModal, useEntityActions } from '@shared/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import AppointmentDetails from '../components/AppointmentDetails'

export default function AppointmentDetailsPage() {
  const config = ENTITY_CONFIG.appointments
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const [deleteAppointment] = useDeleteAppointmentMutation()
  
  const { data: appointment, isLoading, error } = useGetAppointmentQuery(appointmentId, {
    skip: !appointmentId
  })
  
  const actions = useEntityActions(config.basePath)
  const [confirm, ConfirmModal] = useConfirmModal()
  
  const handleEdit = () => {
    navigate(`${config.basePath}/${appointmentId}/edit`)
  }
  
  const handleDelete = async () => {
    const appointmentInfo = appointment 
      ? `appointment on ${new Date(appointment.date).toLocaleDateString('en-US')} with ${appointment.patientName || 'patient'}`
      : 'this appointment'
    
    const confirmed = await confirm({
      title: 'Cancel Appointment',
      message: `Are you sure you want to cancel the ${appointmentInfo}? This action cannot be undone.`
    })
    
    if (confirmed) {
      try {
        await deleteAppointment({ id: appointmentId }).unwrap()
        navigate(config.basePath)
      } catch (error) {
        // console.error('Failed to delete appointment:', error)
      }
    }
  }

  if (error) {
    return <ErrorPage error={error} backTo={config.basePath} entityName="appointment" />
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <BackButton to={config.basePath}>Back to Appointments</BackButton>
      
      <AppointmentDetails
        appointment={appointment}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
      
      {ConfirmModal}
    </div>
  )
}
