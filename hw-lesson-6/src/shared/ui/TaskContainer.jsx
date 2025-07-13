function TaskContainer({ children }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {children}
      </div>
    </div>
  )
}

export default TaskContainer
