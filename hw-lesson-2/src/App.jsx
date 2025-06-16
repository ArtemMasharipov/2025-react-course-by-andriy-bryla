import { useState } from 'react';
import Button from './shared/components/Button.jsx';
import { APP_CONFIG, TASKS } from './shared/constants/index.js';

function App() {
  const [currentTask, setCurrentTask] = useState(APP_CONFIG.defaultTask);

  const currentTaskData = TASKS.find(task => task.id === currentTask);
  const CurrentTaskComponent = currentTaskData?.component;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                {APP_CONFIG.name}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              {TASKS.map(task => (
                <Button
                  key={task.id}
                  variant={currentTask === task.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentTask(task.id)}
                  aria-label={`Переключитися на ${task.name}`}
                >
                  {task.id}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <CurrentTaskComponent />
      </main>
    </div>
  );
}

export default App;
