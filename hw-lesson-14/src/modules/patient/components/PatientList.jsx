import { ListWrapper } from '@shared/data'
import { ActionButtons } from '@shared/ui'
import { memo, useCallback } from 'react'

const PatientList = memo(({ items, onView, onEdit, onDelete, isLoading, error }) => {
  const renderPatient = useCallback((patient) => (
    <PatientItem patient={patient} onView={onView} onEdit={onEdit} onDelete={onDelete} />
  ), [onView, onEdit, onDelete])

  return (
    <ListWrapper
      items={items}
      isLoading={isLoading}
      error={error}
      emptyMessage="No patients found"
    >
      {renderPatient}
    </ListWrapper>
  )
})

const PatientItem = memo(({ patient, onView, onEdit, onDelete }) => {
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const calculateAge = (birthDate) => {
    if (!birthDate) return null
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const age = calculateAge(patient.birthDate)

  return (
    <div className="space-y-4">
      {/* Header with avatar, name and desktop actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-lg flex-shrink-0">
            {getInitials(patient.fullName)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {patient.fullName}
            </h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {age && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {age}y
                </span>
              )}
              {patient.gender && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {patient.gender}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Desktop action buttons */}
        <div className="hidden sm:block flex-shrink-0">
          <ActionButtons 
            entityId={patient.id}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>

      {/* Contact info - compact */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">📧</span>
          <span className="text-gray-900 truncate">{patient.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">📱</span>
          <span className="text-gray-900">{patient.phone}</span>
        </div>
        {patient.address && (
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-400 mt-0.5">📍</span>
            <span className="text-gray-700 line-clamp-2">{patient.address}</span>
          </div>
        )}
      </div>

      {/* Mobile action buttons - full width */}
      <div className="sm:hidden pt-2 border-t border-gray-100">
        <ActionButtons 
          entityId={patient.id}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
})

PatientList.displayName = 'PatientList'
PatientItem.displayName = 'PatientItem'

export default PatientList
