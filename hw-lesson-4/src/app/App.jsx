import { useEffect, useState } from 'react'

import { Header, TaskLayout } from './layout'

export default function App() {
  const [activeTaskId, setActiveTaskId] = useState('messenger')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeTaskId])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTaskId={activeTaskId}
        onTaskChange={setActiveTaskId}
      />
      <TaskLayout activeTaskId={activeTaskId} />
    </div>
  )
}
