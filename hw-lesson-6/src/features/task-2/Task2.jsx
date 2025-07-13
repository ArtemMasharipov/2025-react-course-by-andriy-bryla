import { TASKS_METADATA } from '@/app/metadata/tasks'
import TaskCard from '@/shared/ui/TaskCard'
import TaskContainer from '@/shared/ui/TaskContainer'
import TaskDescription from '@/shared/ui/TaskDescription'

import DataGrid from './components/DataGrid'

function Task2() {
  return (
    <TaskContainer>
      <TaskDescription
        title={TASKS_METADATA.task2.title}
        description={TASKS_METADATA.task2.description}
      />
      <TaskCard>
        <DataGrid />
      </TaskCard>
    </TaskContainer>
  )
}

export default Task2
