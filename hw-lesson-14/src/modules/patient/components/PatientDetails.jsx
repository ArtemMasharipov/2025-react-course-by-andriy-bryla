import { AppButton } from '@shared/ui'
import { memo } from 'react'

const PatientDetails = memo(({ patient, onEdit, onDelete, isLoading = false }) => {
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

  if (!patient) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-gray-400 text-6xl mb-4">👤</div>
        <p className="text-lg">Patient not found</p>
      </div>
    )
  }

  return (
    <div className="card-lime rounded-2xl p-6 space-y-6">
      {/* Action buttons - full width on mobile, right-aligned on desktop */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
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
            Delete
          </AppButton>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            {patient.fullName}
          </h1>
          <p className="text-gray-600 mt-1">Patient ID: {patient.id}</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-medium text-gray-600 text-sm sm:w-20">Email:</span>
              <span className="text-gray-900 text-sm truncate">{patient.email || 'Not provided'}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-medium text-gray-600 text-sm sm:w-20">Phone:</span>
              <span className="text-gray-900 text-sm">{patient.phone || 'Not provided'}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-medium text-gray-600 text-sm sm:w-20">DOB:</span>
              <span className="text-gray-900 text-sm">
                {patient.birthDate
                  ? new Date(patient.birthDate).toLocaleDateString('en-US')
                  : 'Not provided'
                }
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-medium text-gray-600 text-sm sm:w-20">Gender:</span>
              <span className="text-gray-900 text-sm">{patient.gender || 'Not specified'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      {patient.address && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Address</h3>
          <div className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3">
            {patient.address}
          </div>
        </div>
      )}

      {/* Notes */}
      {patient.notes && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
          <div className="bg-gray-50 rounded-lg p-3 text-gray-700 text-sm">
            {patient.notes}
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-2">
          <div>
            <span className="font-medium">Created:</span> {new Date(patient.createdAt).toLocaleString('en-US')}
          </div>
          <div>
            <span className="font-medium">Last Updated:</span> {new Date(patient.updatedAt).toLocaleString('en-US')}
          </div>
        </div>
      </div>
    </div>
  )
})

PatientDetails.displayName = 'PatientDetails'

export default PatientDetails
