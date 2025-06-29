import { BookOpen } from 'lucide-react';
import { TASKS } from '../constants/index.js';

const TaskDescription = ({ taskId }) => {
  const task = TASKS.find(task => task.id === taskId);
  if (!task) return null;

  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            {task.title}
          </h3>
          <div className="text-gray-700 whitespace-pre-line">
            {task.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDescription;
