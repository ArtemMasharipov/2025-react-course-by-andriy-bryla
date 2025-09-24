import { PageHeader } from '@shared/ui'

export default function BaseEntityPage({ 
  title,
  createPath,
  createLabel,
  children,
  deleteModal
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <PageHeader
        title={title}
        createPath={createPath}
        createLabel={createLabel}
      />
      
      {children}
      
      {deleteModal}
    </div>
  )
}
