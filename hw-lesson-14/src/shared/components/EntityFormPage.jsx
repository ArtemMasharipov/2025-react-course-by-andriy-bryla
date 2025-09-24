import { AppButton, LoadingSpinner } from '@shared/ui'
import { useNavigate, useParams } from 'react-router-dom'

/**
 * Универсальный компонент страницы формы для любой сущности
 * Устраняет дублирование кода между PatientFormPage, DoctorFormPage, AppointmentFormPage
 */
export default function EntityFormPage({
  entityName,
  entityTitle,
  paramName,
  basePath,
  useGetQuery,
  useCreateMutation,
  useUpdateMutation,
  FormComponent
}) {
  const params = useParams()
  const entityId = params[paramName]
  const navigate = useNavigate()
  
  const isEditing = Boolean(entityId)

  const { data: entity, isLoading, error } = useGetQuery(entityId, {
    skip: !isEditing
  })

  const [create, { isLoading: isCreating }] = useCreateMutation()
  const [update, { isLoading: isUpdating }] = useUpdateMutation()

  const handleSubmit = async (formData) => {
    try {
      if (isEditing) {
        await update({ id: entityId, ...formData }).unwrap()
        navigate(`${basePath}/${entityId}`)
      } else {
        const result = await create(formData).unwrap()
        navigate(`${basePath}/${result.id}`)
      }
    } catch (err) {
      // console.error(`Failed to save ${entityName}:`, err)
    }
  }

  if (isEditing && isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-2xl mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
              <LoadingSpinner size="lg" variant="white" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Loading {entityTitle}</h2>
              <p className="text-gray-600">Please wait while we fetch the data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isEditing && error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
          <div className="card-lime rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <span className="text-3xl text-white">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Error Loading {entityTitle}
              </h2>
              <p className="text-red-600 font-medium mb-4">
                {error.message || `Failed to load ${entityName} with ID: ${entityId}`}
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Please try again or contact support if the problem persists.
              </p>
              <AppButton
                onClick={() => navigate(-1)}
                variant="secondary"
                size="lg"
                className="shadow-lg"
              >
                <span>←</span>
                Go Back
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <div className="card-lime rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {isEditing ? `Edit ${entityTitle}` : `New ${entityTitle}`}
        </h1>

        <FormComponent
          {...{ [entityName]: entity }}
          onSubmit={handleSubmit}
          isLoading={isCreating || isUpdating}
          onCancel={() => navigate(-1)}
        />
      </div>
    </div>
  )
}
