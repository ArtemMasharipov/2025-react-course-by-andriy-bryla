
export const TaskSwitcher = ({ tasks, activeTask, onTaskChange, isMobile = false }) => {
  const taskList = Object.values(tasks)
  if (isMobile) {
    return (
      <div className="space-y-1">
        {taskList.map((task) => {
          const isActive = activeTask === task.id
          const [emoji, ...titleParts] = task.title.split(' ')
          const title = titleParts.join(' ')

          return (
            <button
              key={task.id}
              onClick={() => onTaskChange(task.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left
                ${isActive
                  ? 'bg-blue-50 text-blue-900 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                }
              `}
            >
              <span className="text-lg">{emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">
                  {title}
                </div>
                <div className="text-xs opacity-70">
                  Задача {task.taskNumber}
                </div>
              </div>
              {isActive && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    )
  }
  // Desktop version
  return (
    <div className="flex items-center gap-2">
      {taskList.map((task) => {
        const isActive = activeTask === task.id
        const [emoji, ...titleParts] = task.title.split(' ')
        const title = titleParts.join(' ')

        return (
          <button
            key={task.id}
            onClick={() => onTaskChange(task.id)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium
              ${isActive
                ? 'bg-blue-100 text-blue-900 ring-1 ring-blue-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }
            `}
          >
            <span className="text-base">{emoji}</span>
            <span className="truncate max-w-[120px] lg:max-w-[150px]">
              {title}
            </span>
          </button>
        )
      })}
    </div>
  )
}
