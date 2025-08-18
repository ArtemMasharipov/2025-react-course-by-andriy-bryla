import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { teacherAPI } from '../api/teacher.api'
import { TeacherForm } from '../components'

export default function TeacherFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchTeacher = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await teacherAPI.getById(id)
        setTeacher(data)
      } catch (err) {
        console.error('Failed to fetch teacher:', err)
        setError(err.message || 'Помилка завантаження даних')
      } finally {
        setLoading(false)
      }
    }

    fetchTeacher()
  }, [id])

  if (loading || error) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        {loading ? 'Завантаження...' : <span className="text-red-500">Помилка: {error}</span>}
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        {id ? 'Редагувати викладача' : 'Додати викладача'}
      </h1>
      <TeacherForm
        initialData={teacher}
        loading={loading}
        onCancel={() => navigate(-1)}
        onSubmit={async payload => {
          try {
            setLoading(true)
            if (id) await teacherAPI.update(id, payload)
            else await teacherAPI.create(payload)
            navigate('/teachers')
          } catch (e) {
            console.error(e)
            alert('Не вдалося зберегти викладача')
          } finally {
            setLoading(false)
          }
        }}
      />
    </div>
  )
}
