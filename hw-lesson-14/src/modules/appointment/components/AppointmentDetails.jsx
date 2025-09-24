import { AppButton } from '@shared/ui'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const AppointmentDetails = memo(({ appointment, onEdit, onDelete, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="card-lime rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-300 rounded mb-4 w-64"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-36"></div>
          <div className="h-4 bg-gray-200 rounded w-52"></div>
        </div>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-gray-400 text-6xl mb-4">📅</div>
        <p className="text-lg">Appointment not found</p>
      </div>
    )
  }

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      'no-show': 'bg-gray-100 text-gray-800'
    }
    return colors[status] || colors.scheduled
  }

  return (
    <div className="card-lime rounded-lg p-6">
      {/* Action buttons - full width on mobile, right-aligned on desktop */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mb-6">
        <div className="flex gap-3 w-full sm:w-auto">
          <AppButton
            onClick={onEdit}
            variant="secondary"
            size="md"
            className="flex-1 sm:flex-none"
          >
            Edit
          </AppButton>
          <AppButton
            onClick={onDelete}
            variant="danger"
            size="md"
            className="flex-1 sm:flex-none"
          >
            Cancel
          </AppButton>
        </div>
      </div>

      {/* Header content */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Appointment Details
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-lg text-gray-600">
            {new Date(appointment.date).toLocaleString('en-US')}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </span>
        </div>
        <p className="text-gray-600 mt-1">Appointment ID: {appointment.id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Patient Information</h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-medium text-gray-600 w-24">Patient:</span>
              <span className="text-gray-900">
                {appointment.patientName || `ID: ${appointment.patientId}`}
              </span>
            </div>
            {appointment.patientId && (
              <div>
                <Link
                  to={`/patients/${appointment.patientId}`}
                  className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                >
                  View Patient Profile
                  <span className="ml-1">🔗</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Doctor Information</h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-medium text-gray-600 w-24">Doctor:</span>
              <span className="text-gray-900">
                {appointment.doctorName || `ID: ${appointment.doctorId}`}
              </span>
            </div>
            {appointment.doctorId && (
              <div>
                <Link
                  to={`/doctors/${appointment.doctorId}`}
                  className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                >
                  View Doctor Profile
                  <span className="ml-1">🔗</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {appointment.reason && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Reason for Visit</h3>
          <div className="bg-gray-50 rounded-md p-4 text-gray-700">
            {appointment.reason}
          </div>
        </div>
      )}

      {appointment.notes && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Notes</h3>
          <div className="bg-gray-50 rounded-md p-4 text-gray-700">
            {appointment.notes}
          </div>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Created:</span> {new Date(appointment.createdAt).toLocaleString('en-US')}
          </div>
          <div>
            <span className="font-medium">Last Updated:</span> {new Date(appointment.updatedAt).toLocaleString('en-US')}
          </div>
        </div>
      </div>
    </div>
  )
})

AppointmentDetails.displayName = 'AppointmentDetails'

export default AppointmentDetails
