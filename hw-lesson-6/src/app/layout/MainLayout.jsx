import { useState } from 'react'

import Navbar from '@/features/navbar/Navbar'
import Task1 from '@/features/task-1/Task1'
import Task2 from '@/features/task-2/Task2'
import Task3 from '@/features/task-3/Task3'
import Task4 from '@/features/task-4/Task4'

function MainLayout() {
  const [activeTask, setActiveTask] = useState(1)

  const renderActiveTask = () => {
    switch (activeTask) {
      case 1:
        return <Task1 />
      case 2:
        return <Task2 />
      case 3:
        return <Task3 />
      case 4:
        return <Task4 />
      default:
        return <Task1 />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTask={activeTask} onTaskChange={setActiveTask} />
      <main className="container mx-auto px-4 py-8">
        {renderActiveTask()}
      </main>
    </div>
  )
}

export default MainLayout
