import { TASKS_METADATA } from '@/app/metadata/tasks'
import TaskCard from '@/shared/ui/TaskCard'
import TaskContainer from '@/shared/ui/TaskContainer'
import TaskDescription from '@/shared/ui/TaskDescription'

import Calculator from './components/Calculator'

function Task1() {
  return (
    <TaskContainer>
      <TaskDescription
        title={TASKS_METADATA.task1.title}
        description={TASKS_METADATA.task1.description}
      />
      <TaskCard>
        <Calculator />
      </TaskCard>
    </TaskContainer>
  )
}

export default Task1
