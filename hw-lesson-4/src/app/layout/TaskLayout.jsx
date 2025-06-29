import { MessengerApp, NumberGuessingGame } from '../../features'

const TASK_COMPONENTS = {
  messenger: MessengerApp,
  'guess-number': NumberGuessingGame,
}

export default function TaskLayout({ activeTaskId }) {
  const TaskComponent = TASK_COMPONENTS[activeTaskId] || MessengerApp

  return (
    <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
      <TaskComponent />
    </main>
  )
}
