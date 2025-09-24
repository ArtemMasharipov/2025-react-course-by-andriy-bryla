import { GENDER_OPTIONS } from '@shared/config'
import { AppForm } from '@shared/forms'
import { AppButton, FormField, LoadingSpinner } from '@shared/ui'
import { memo } from 'react'

const PatientForm = memo(({ patient, onSubmit, isLoading = false, onCancel }) => {
  // Показываем спиннер только при загрузке данных для редактирования
  if (isLoading && patient?.id) {
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
          // console.error('Failed to save patient:', error)
        }
      }}
      initialData={{
        fullName: '',
        birthDate: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        notes: '',
        ...patient
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
                placeholder="John Doe"
                required
                minLength={2}
                error={errors.fullName}
              />
            </div>

            <FormField
              label="Birth Date"
              type="date"
              value={data.birthDate}
              onChange={(e) => updateField('birthDate', e.target.value)}
              error={errors.birthDate}
            />

            <FormField
              type="select"
              label="Gender"
              value={data.gender}
              onChange={(e) => updateField('gender', e.target.value)}
              options={GENDER_OPTIONS}
              placeholder="Select gender"
              error={errors.gender}
            />

            <FormField
              label="Phone"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+380501234567"
              pattern="^[\+]?[0-9\s\-\(\)]{10,}$"
              title="Enter a valid phone number"
              error={errors.phone}
            />

            <FormField
              label="Email"
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="john@example.com"
              required
              error={errors.email}
            />
          </div>

          <FormField
            label="Address"
            value={data.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="м. Київ, вул. Шевченка, 12"
            error={errors.address}
          />

          <FormField
            type="textarea"
            label="Notes"
            value={data.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            placeholder="Additional notes about the patient..."
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
              disabled={isLoading || !data.fullName || !data.email}
              loading={isLoading}
            >
              {patient?.id ? 'Update Patient' : 'Create Patient'}
            </AppButton>
          </div>
        </>
      )}
    </AppForm>
  )
})

PatientForm.displayName = 'PatientForm'

export default PatientForm
