import { TeacherItem } from '.'

export default function TeacherList({
  teachers,
  selectedIds = new Set(),
  onAssign,
  onUnassign,
  onDelete,
  loadingId,
  meetingFull,
  onEdit,
}) {
  if (!teachers?.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-10 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-600">
        <p className="text-sm">Немає викладачів. Додайте першого через кнопку зверху.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
  {teachers.map(({ _id, fullName, subject, photoBase64 }) => (
        <TeacherItem
          key={_id}
          fullName={fullName}
          subject={subject}
      photoBase64={photoBase64}
          selected={selectedIds.has(String(_id))}
          loading={loadingId === _id}
          onSelect={() => onAssign?.(_id)}
          onUnassign={() => onUnassign?.(_id)}
          onDelete={() => onDelete?.(_id)}
          onEdit={() => onEdit?.(_id)}
          meetingFull={meetingFull}
        />
      ))}
    </ul>
  )
}
