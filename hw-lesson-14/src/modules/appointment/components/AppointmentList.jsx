import { ListWrapper } from '@shared/data'
import { ActionButtons } from '@shared/ui'
import { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'

const AppointmentList = memo(({
  items = [],
  onView,
  onEdit,
  onDelete,
  isLoading = false,
  error = null
}) => {
  const renderAppointment = useCallback((appointment) => (
    <AppointmentItem appointment={appointment} onView={onView} onEdit={onEdit} onDelete={onDelete} />
  ), [onView, onEdit, onDelete])

  return (
    <ListWrapper
      items={items}
      isLoading={isLoading}
      error={error}
      emptyMessage="No appointments found"
    >
      {renderAppointment}
    </ListWrapper>
  )
})

const AppointmentItem = memo(({ appointment, onView, onEdit, onDelete }) => {
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const isToday = date.toDateString() === today.toDateString()
    const isTomorrow = date.toDateString() === tomorrow.toDateString()
    
    if (isToday) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
    } else if (isTomorrow) {
      return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  }

  const getStatusConfig = (status) => {
    const configs = {
      scheduled: { 
        bg: 'bg-blue-100', 
        text: 'text-blue-800', 
        icon: '📅',
        ring: 'ring-blue-200'
      },
      completed: { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        icon: '✅',
        ring: 'ring-green-200'
      },
      cancelled: { 
        bg: 'bg-red-100', 
        text: 'text-red-800', 
        icon: '❌',
        ring: 'ring-red-200'
      },
      'no-show': { 
        bg: 'bg-gray-100', 
        text: 'text-gray-800', 
        icon: '❔',
        ring: 'ring-gray-200'
      }
    }
    return configs[status] || configs.scheduled
  }

  const statusConfig = getStatusConfig(appointment.status)

  const isUpcoming = () => {
    const appointmentDate = new Date(appointment.date)
    const now = new Date()
    return appointmentDate > now && appointment.status === 'scheduled'
  }

  return (
    <div className="space-y-4">
      {/* Header with status, date and desktop actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`w-12 h-12 ${statusConfig.bg} rounded-2xl flex items-center justify-center shadow-lg ring-2 ${statusConfig.ring} flex-shrink-0`}>
            <span className="text-xl">{statusConfig.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {formatDateTime(appointment.date)}
            </h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                {statusConfig.icon}
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
              {isUpcoming() && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  ⏰ Upcoming
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Desktop action buttons */}
        <div className="hidden sm:block flex-shrink-0">
          <ActionButtons 
            entityId={appointment.id}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>

      {/* Participants - compact */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">👤</span>
          <span className="text-gray-700">Patient:</span>
          <Link 
            to={`/patients/${appointment.patientId}`} 
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors truncate"
          >
            {appointment.patientName || `ID: ${appointment.patientId}`}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">🩺</span>
          <span className="text-gray-700">Doctor:</span>
          <Link 
            to={`/doctors/${appointment.doctorId}`} 
            className="font-medium text-emerald-600 hover:text-emerald-800 hover:underline transition-colors truncate"
          >
            {appointment.doctorName || `ID: ${appointment.doctorId}`}
          </Link>
        </div>
        {appointment.reason && (
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-400 mt-0.5">📝</span>
            <span className="text-gray-700 line-clamp-2">{appointment.reason}</span>
          </div>
        )}
      </div>

      {/* Mobile action buttons - full width */}
      <div className="sm:hidden pt-2 border-t border-gray-100">
        <ActionButtons 
          entityId={appointment.id}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
})

AppointmentList.displayName = 'AppointmentList'
AppointmentItem.displayName = 'AppointmentItem'

export default AppointmentList
