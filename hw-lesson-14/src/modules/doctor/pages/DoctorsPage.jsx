import { useDeleteDoctorMutation, useGetDoctorsPaginatedQuery } from '@modules/doctor/api/doctor.api'
import { BaseEntityPage } from '@shared/components'
import { ENTITY_CONFIG } from '@shared/config'
import { AppPagination, SearchInput } from '@shared/data'
import { useConfirmModal, useEntityActions, useEntityList } from '@shared/hooks'
import DoctorList from '../components/DoctorList'

export default function DoctorsPage() {
  const config = ENTITY_CONFIG.doctors
  const [deleteDoctor] = useDeleteDoctorMutation()
  
  const entityList = useEntityList(useGetDoctorsPaginatedQuery, {
    searchField: config.searchField,
    entityName: 'doctors'
  })
  
  const actions = useEntityActions(config.basePath)
  const [confirm, ConfirmModal] = useConfirmModal()
  
  const handleDelete = async (doctorId) => {
    const doctor = entityList.items.find(item => item.id === doctorId)
    const doctorName = doctor ? doctor.fullName : 'this doctor'
    
    const confirmed = await confirm({
      title: 'Delete Doctor',
      message: `Are you sure you want to delete ${doctorName}? This action cannot be undone.`
    })
    
    if (confirmed) {
      try {
        await deleteDoctor({ id: doctorId }).unwrap()
        entityList.refresh()
      } catch (error) {
        // console.error('Failed to delete doctor:', error)
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
      <div className="mb-6">
        <SearchInput 
          value={entityList.searchQuery}
          onChange={entityList.setSearchQuery}
          placeholder="Search doctors..."
        />
      </div>

      <DoctorList
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
