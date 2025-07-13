import { TASKS_METADATA } from '@/app/metadata/tasks'
import TaskCard from '@/shared/ui/TaskCard'
import TaskContainer from '@/shared/ui/TaskContainer'
import TaskDescription from '@/shared/ui/TaskDescription'

import DebouncedSearch from './components/DebouncedSearch'

function Task4() {
  return (
    <TaskContainer>
      <TaskDescription
        title={TASKS_METADATA.task4.title}
        description={TASKS_METADATA.task4.description}
      />
      <TaskCard>
        <DebouncedSearch />
      </TaskCard>
    </TaskContainer>
  )
}

export default Task4
