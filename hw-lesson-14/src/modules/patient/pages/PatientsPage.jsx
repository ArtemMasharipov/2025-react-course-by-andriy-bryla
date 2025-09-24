import { useDeletePatientMutation, useGetPatientsPaginatedQuery } from '@modules/patient/api/patient.api'
import { ENTITY_CONFIG } from '@shared/config'
import { AppPagination, SearchInput } from '@shared/data'
import { useConfirmModal, useEntityActions, useEntityList } from '@shared/hooks'
import { PageHeader } from '@shared/ui'
import { handleApiError } from '@shared/utils'
import PatientList from '../components/PatientList'

export default function PatientsPage() {
  const config = ENTITY_CONFIG.patients
  
  const entityList = useEntityList(useGetPatientsPaginatedQuery, {
    searchField: config.searchField,
    entityName: 'patients'
  })
  
  const actions = useEntityActions(config.basePath)
  const [deletePatient] = useDeletePatientMutation()
  const [confirm, ConfirmModal] = useConfirmModal()
  
  const handleDelete = async (patientId) => {
    const patient = entityList.items.find(item => item.id === patientId)
    const patientName = patient ? patient.fullName : 'this patient'
    
    const confirmed = await confirm({
      title: 'Delete Patient',
      message: `Are you sure you want to delete ${patientName}? This action cannot be undone.`
    })
    
    if (confirmed) {
      try {
        await deletePatient({ id: patientId }).unwrap()
        entityList.refresh()
      } catch (error) {
        handleApiError(error, 'Delete patient')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <PageHeader
        title={config.title}
        createPath={`${config.basePath}/new`}
        createLabel={config.createLabel}
      />
      
      {entityList.searchProps && (
        <div className="mb-6">
          <SearchInput {...entityList.searchProps} />
        </div>
      )}

      <PatientList
        items={entityList.items}
        onView={actions.view}
        onEdit={actions.edit}
        onDelete={handleDelete}
        isLoading={entityList.isLoading}
        error={entityList.error}
      />

      <AppPagination {...entityList.paginationProps} />
      
      {ConfirmModal}
    </div>
  )
}