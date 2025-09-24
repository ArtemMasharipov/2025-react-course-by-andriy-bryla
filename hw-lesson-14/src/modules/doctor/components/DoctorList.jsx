import { ListWrapper } from '@shared/data'
import { ActionButtons } from '@shared/ui'
import { memo, useCallback } from 'react'

const DoctorList = memo(({ items, onView, onEdit, onDelete, isLoading, error }) => {
  const renderDoctor = useCallback((doctor) => (
    <DoctorItem doctor={doctor} onView={onView} onEdit={onEdit} onDelete={onDelete} />
  ), [onView, onEdit, onDelete])

  return (
    <ListWrapper
      items={items}
      isLoading={isLoading}
      error={error}
      emptyMessage="No doctors found"
    >
      {renderDoctor}
    </ListWrapper>
  )
})

const DoctorItem = memo(({ doctor, onView, onEdit, onDelete }) => {
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
  }

  const getSpecialtyColor = (specialty) => {
    const colors = {
      'Cardiology': 'bg-red-100 text-red-800',
      'Neurology': 'bg-purple-100 text-purple-800',
      'Pediatrics': 'bg-green-100 text-green-800',
      'Orthopedics': 'bg-blue-100 text-blue-800',
      'Dermatology': 'bg-yellow-100 text-yellow-800',
      'Psychiatry': 'bg-indigo-100 text-indigo-800',
      'General Medicine': 'bg-gray-100 text-gray-800',
      'Surgery': 'bg-orange-100 text-orange-800'
    }
    return colors[specialty] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-4">
      {/* Header with avatar, name and desktop actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-lg flex-shrink-0">
            {getInitials(doctor.fullName)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {doctor.fullName}
            </h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSpecialtyColor(doctor.specialty)}`}>
                🩺 {doctor.specialty}
              </span>
              {doctor.room && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                  R{doctor.room}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Desktop action buttons */}
        <div className="hidden sm:block flex-shrink-0">
          <ActionButtons 
            entityId={doctor.id}
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
          <span className="text-gray-900 truncate">{doctor.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">📱</span>
          <span className="text-gray-900">{doctor.phone}</span>
        </div>
        {doctor.notes && (
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-400 mt-0.5">📝</span>
            <span className="text-gray-700 line-clamp-2">{doctor.notes}</span>
          </div>
        )}
      </div>

      {/* Mobile action buttons - full width */}
      <div className="sm:hidden pt-2 border-t border-gray-100">
        <ActionButtons 
          entityId={doctor.id}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
})

DoctorList.displayName = 'DoctorList'
DoctorItem.displayName = 'DoctorItem'

export default DoctorList
