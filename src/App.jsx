import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from './shared/components/Button.jsx';
import { APP_CONFIG, TASKS } from './shared/constants/index.js';

function App() {
  const [currentTask, setCurrentTask] = useState(APP_CONFIG.defaultTask);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentTaskData = TASKS.find(task => task.id === currentTask);
  const CurrentTaskComponent = currentTaskData?.component;

  const handleTaskChange = (taskId) => {
    setCurrentTask(taskId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                <span className="hidden sm:inline">{APP_CONFIG.name}</span>
                <span className="sm:hidden">HW Lesson 2</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              {TASKS.map(task => (
                <Button
                  key={task.id}
                  variant={currentTask === task.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleTaskChange(task.id)}
                  aria-label={`Переключитися на ${task.name}`}
                >
                  {task.id}
                </Button>
              ))}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-label="Відкрити меню"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-3">
              <div className="grid grid-cols-3 gap-2 px-2">
                {TASKS.map(task => (
                  <Button
                    key={task.id}
                    variant={currentTask === task.id ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleTaskChange(task.id)}
                    className="w-full justify-center"
                    aria-label={`Переключитися на ${task.name}`}
                  >
                    Задача {task.id}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        <CurrentTaskComponent />
      </main>
    </div>
  );
}

export default App;
