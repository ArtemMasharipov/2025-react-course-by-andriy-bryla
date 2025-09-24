import { AppForm } from '@shared/forms'
import { AppButton, FormField, LoadingSpinner } from '@shared/ui'
import { memo } from 'react'

const DoctorForm = memo(({ doctor, onSubmit, isLoading = false, onCancel }) => {
  if (isLoading && doctor?.id) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <AppForm 
      onSubmit={async (data) => {
        try {
          await onSubmit?.(data)
        } catch (error) {
          // console.error('Failed to save doctor:', error)
        }
      }}
      initialData={{
        fullName: '',
        specialty: '',
        email: '',
        phone: '',
        room: '',
        notes: '',
        ...doctor
      }}
    >
      {(data, updateField, errors) => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormField
                label="Full Name"
                value={data.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                placeholder="Dr. Jane Smith (include Dr. prefix)"
                required
                minLength={2}
                error={errors.fullName}
              />
            </div>

            <FormField
              label="Specialty"
              value={data.specialty}
              onChange={(e) => updateField('specialty', e.target.value)}
              placeholder="Cardiology"
              required
              error={errors.specialty}
            />

            <FormField
              label="Room"
              value={data.room}
              onChange={(e) => updateField('room', e.target.value)}
              placeholder="202"
              error={errors.room}
            />

            <FormField
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="doctor@example.com"
              required
              error={errors.email}
            />

            <FormField
              label="Phone"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+380631234567"
              pattern="^[\+]?[0-9\s\-\(\)]{10,}$"
              title="Enter a valid phone number"
              error={errors.phone}
            />
          </div>

          <FormField
            type="textarea"
            label="Notes"
            value={data.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            placeholder="Additional notes about the doctor..."
            error={errors.notes}
          />

          <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6 sm:flex-row flex-col gap-3 sm:gap-0">
            <AppButton
              type="button"
              onClick={onCancel}
              variant="secondary"
              disabled={isLoading}
            >
              Cancel
            </AppButton>

            <AppButton
              type="submit"
              disabled={isLoading || !data.fullName || !data.specialty || !data.email}
              loading={isLoading}
            >
              {doctor?.id ? 'Update Doctor' : 'Create Doctor'}
            </AppButton>
          </div>
        </>
      )}
    </AppForm>
  )
})

DoctorForm.displayName = 'DoctorForm'

export default DoctorForm
