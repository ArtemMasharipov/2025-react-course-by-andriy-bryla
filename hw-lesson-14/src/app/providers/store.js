import { appointmentApi } from '@modules/appointment/api/appointment.api'
import { doctorApi } from '@modules/doctor/api/doctor.api'
import { patientApi } from '@modules/patient/api/patient.api'
import { configureStore } from '@reduxjs/toolkit'

/**
 * Оптимизированное хранилище Redux
 * Убираем сложность, используем простую конфигурацию
 */

const store = configureStore({
  reducer: {
    // Используем правильные reducer paths из API
    [patientApi.reducerPath]: patientApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      patientApi.middleware,
      doctorApi.middleware,
      appointmentApi.middleware
    ),
})

export default store