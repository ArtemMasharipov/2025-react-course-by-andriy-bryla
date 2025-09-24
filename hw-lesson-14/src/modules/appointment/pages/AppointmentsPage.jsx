import { useDeleteAppointmentMutation, useGetAppointmentsPaginatedQuery } from '@modules/appointment/api/appointment.api'
import { BaseEntityPage } from '@shared/components'
import { ENTITY_CONFIG } from '@shared/config'
import { AppPagination, SearchInput } from '@shared/data'
import { useConfirmModal, useEntityActions, useEntityList } from '@shared/hooks'
import { SortToggleButton } from '@shared/ui'
import { handleApiError } from '@shared/utils'
import AppointmentList from '../components/AppointmentList'

const SORT_FIELD = 'date'

export default function AppointmentsPage() {
  const config = ENTITY_CONFIG.appointments
  const [deleteAppointment] = useDeleteAppointmentMutation()
  
  const entityList = useEntityList(useGetAppointmentsPaginatedQuery, {
    searchField: config.searchField,
    entityName: 'appointments',
    defaultSort: { field: SORT_FIELD, dir: 'asc' }
  })
  
  const actions = useEntityActions(config.basePath)
  const [confirm, ConfirmModal] = useConfirmModal()
  
  const handleDelete = async (appointmentId) => {
    const appointment = entityList.items.find(item => item.id === appointmentId)
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
        entityList.refresh()
      } catch (error) {
        handleApiError(error, 'Delete appointment')
      }
    }
  }

  return (
    <BaseEntityPage 
      title={config.title}
      createPath={`${config.basePath}/new`}
      createLabel={config.createLabel}
      deleteModal={ConfirmModal}
    >
      <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex-1 max-w-md">
          <SearchInput 
            value={entityList.searchQuery}
            onChange={entityList.setSearchQuery}
            placeholder="Search by patient name..."
          />
        </div>
        
        <div className="flex-shrink-0">
          <SortToggleButton
            label="Date"
            isAscending={entityList.sort.dir === 'asc'}
            onToggle={() => entityList.toggleSort(SORT_FIELD)}
          />
        </div>
      </div>
      
      <AppointmentList
        items={entityList.items}
        onView={actions.view}
        onEdit={actions.edit}
        onDelete={handleDelete}
        isLoading={entityList.isLoading}
        error={entityList.error}
      />

      <AppPagination {...entityList.paginationProps} />
    </BaseEntityPage>
  )
}
