export const ENTITY_CONFIG = {
  doctors: {
    title: 'Doctors',
    createLabel: 'Add Doctor',
    searchField: 'searchFullName',
    basePath: '/doctors',
    paramName: 'doctorId',
    deleteMessage: 'Are you sure you want to delete this doctor? This will also delete all their appointments.'
  },
  patients: {
    title: 'Patients',
    createLabel: 'Add Patient', 
    searchField: 'searchFullName',
    basePath: '/patients',
    paramName: 'patientId',
    deleteMessage: 'Are you sure you want to delete this patient? This will also delete all their appointments.'
  },
  appointments: {
    title: 'Appointments',
    createLabel: 'Schedule Appointment',
    searchField: 'searchPatientName', 
    basePath: '/appointments',
    paramName: 'appointmentId',
    deleteMessage: 'Are you sure you want to cancel this appointment?'
  }
}
