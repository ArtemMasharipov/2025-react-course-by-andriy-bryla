import { useGetDoctorsPaginatedQuery } from '@modules/doctor/api/doctor.api'
import { useGetPatientsPaginatedQuery } from '@modules/patient/api/patient.api'
import { APPOINTMENT_STATUS_OPTIONS } from '@shared/config'
import { PaginatedEntitySelector } from '@shared/data'
import { AppForm } from '@shared/forms'
import { AppButton, FormField } from '@shared/ui'
import { handleError } from '@shared/utils'

export default function AppointmentForm({ appointment, onSubmit, isLoading, onCancel }) {

  return (
    <AppForm 
      onSubmit={async (data) => {
        try {
          await onSubmit?.(data)
        } catch (error) {
          handleError(error, 'Save appointment')
        }
      }}
      initialData={{
        patientId: '',
        doctorId: '',
        date: '',
        reason: '',
        status: 'scheduled',
        patientName: '',
        doctorName: '',
        ...appointment
      }}
    >
      {(data, updateField, errors) => (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient <span className="text-red-500 ml-1">*</span>
            </label>
            <PaginatedEntitySelector
              value={data.patientId}
              onChange={(id, patient) => {
                const patientName = patient.fullName || `${patient.firstName} ${patient.lastName}`.trim()
                updateField('patientId', id)
                updateField('patientName', patientName)
              }}
              error={errors.patientId}
              required
              placeholder="Select a patient..."
              useQueryHook={useGetPatientsPaginatedQuery}
              getLabel={(patient) => patient.fullName || `${patient.firstName} ${patient.lastName}`.trim()}
              perPage={15}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor <span className="text-red-500 ml-1">*</span>
            </label>
            <PaginatedEntitySelector
              value={data.doctorId}
              onChange={(id, doctor) => {
                const doctorName = doctor.fullName || `${doctor.firstName} ${doctor.lastName}`.trim()
                updateField('doctorId', id)
                updateField('doctorName', doctorName)
              }}
              error={errors.doctorId}
              required
              placeholder="Select a doctor..."
              useQueryHook={useGetDoctorsPaginatedQuery}
              getLabel={(doctor) => `${doctor.fullName} - ${doctor.specialty}`}
              perPage={15}
            />
          </div>

          <FormField
            label="Date & Time"
            type="datetime-local"
            value={data.date}
            onChange={(e) => updateField('date', e.target.value)}
            required
            error={errors.date}
          />

          <FormField
            label="Reason"
            value={data.reason}
            onChange={(e) => updateField('reason', e.target.value)}
            placeholder="Reason for appointment..."
            error={errors.reason}
          />

          <FormField
            type="select"
            label="Status"
            value={data.status}
            onChange={(e) => updateField('status', e.target.value)}
            options={APPOINTMENT_STATUS_OPTIONS}
            error={errors.status}
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
              disabled={isLoading || !data.patientId || !data.doctorId || !data.date}
              loading={isLoading}
            >
              {appointment?.id ? 'Update Appointment' : 'Create Appointment'}
            </AppButton>
          </div>
        </>
      )}
    </AppForm>
  )
}