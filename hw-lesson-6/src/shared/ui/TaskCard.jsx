function TaskCard({ children }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="text-gray-800">
        {children}
      </div>
    </div>
  )
}

export default TaskCard
