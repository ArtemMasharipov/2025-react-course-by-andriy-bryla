import { useState } from 'react'
import { AdditionTrainer, HotelBooking } from '../features'
import { TASK_METADATA } from '../shared/appConstants'
import { Header } from './layout'

export default function App() {
  const [activeTask, setActiveTask] = useState('addition-trainer')
  const renderActiveTask = () => {
    switch (activeTask) {
      case 'addition-trainer':
        return <AdditionTrainer />
      case 'hotel-booking':
        return <HotelBooking />
      default:
        return <AdditionTrainer />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header
        tasks={TASK_METADATA}
        activeTask={activeTask}
        onTaskChange={setActiveTask}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {renderActiveTask()}
        </div>
      </main>
    </div>
  )
}
