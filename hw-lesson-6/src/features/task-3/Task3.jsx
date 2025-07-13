import { TASKS_METADATA } from '@/app/metadata/tasks'
import TaskCard from '@/shared/ui/TaskCard'
import TaskContainer from '@/shared/ui/TaskContainer'
import TaskDescription from '@/shared/ui/TaskDescription'

import WindowSizeDisplay from './components/WindowSizeDisplay'

function Task3() {
  return (
    <TaskContainer>
      <TaskDescription
        title={TASKS_METADATA.task3.title}
        description={TASKS_METADATA.task3.description}
      />
      <TaskCard>
        <WindowSizeDisplay />
      </TaskCard>
    </TaskContainer>
  )
}

export default Task3
