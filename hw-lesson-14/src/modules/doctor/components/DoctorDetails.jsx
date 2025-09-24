import { AppButton } from '@shared/ui'
import { memo } from 'react'

const DoctorDetails = memo(({ doctor, onEdit, onDelete, isLoading = false }) => {
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

  if (!doctor) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-gray-400 text-6xl mb-4">👨‍⚕️</div>
        <p className="text-lg">Doctor not found</p>
      </div>
    )
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
            Delete
          </AppButton>
        </div>
      </div>

      {/* Header content */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {doctor.fullName}
        </h1>
        <p className="text-blue-600 text-lg font-medium mt-1">{doctor.specialty}</p>
        <p className="text-gray-600 mt-1">Doctor ID: {doctor.id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-medium text-gray-600 w-24">Email:</span>
              <span className="text-gray-900">{doctor.email || 'Not provided'}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-600 w-24">Phone:</span>
              <span className="text-gray-900">{doctor.phone || 'Not provided'}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-600 w-24">Room:</span>
              <span className="text-gray-900">{doctor.room || 'Not provided'}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Specialty</h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-medium text-gray-600 w-24">Specialty:</span>
              <span className="text-gray-900">{doctor.specialty || 'Not specified'}</span>
            </div>
          </div>
        </div>
      </div>

      {doctor.bio && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Biography</h3>
          <div className="bg-gray-50 rounded-md p-4 text-gray-700">
            {doctor.bio}
          </div>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Created:</span> {new Date(doctor.createdAt).toLocaleString('en-US')}
          </div>
          <div>
            <span className="font-medium">Last Updated:</span> {new Date(doctor.updatedAt).toLocaleString('en-US')}
          </div>
        </div>
      </div>
    </div>
  )
})

DoctorDetails.displayName = 'DoctorDetails'

export default DoctorDetails
