import TaskDescription from '../../shared/components/TaskDescription.jsx';
import StatCard from '../../shared/components/layouts/StatCard.jsx';
import TaskLayout from '../../shared/components/layouts/TaskLayout.jsx';
import { THEME } from '../../shared/constants/index.js';

import { STATS_CONFIG } from './constants.js';
import { useEmployees } from './useEmployees.js';

const TaskEmployees = () => {
  const { employees, totalEmployees, totalSalary, averageSalary } = useEmployees();

  const statsData = {
    totalEmployees,
    totalSalary,
    averageSalary
  };

  const getEmployeeInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getEmployeeNumber = (index) => index + 1;

  return (
    <TaskLayout>
      <TaskDescription taskId={4} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {STATS_CONFIG.map(stat => (
          <StatCard
            key={stat.key}
            icon={stat.icon}
            title={stat.title}
            value={statsData[stat.key]}
            color={stat.color}
          />
        ))}
      </div>

      <div className={THEME.card}>
        <ul className="space-y-0 divide-y divide-gray-200">
          {employees.map((employee, index) => {
            const initials = getEmployeeInitials(employee.name);
            const employeeNumber = getEmployeeNumber(index);

            return (
              <li
                key={employee.id}
                className="py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 px-4 -mx-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                      {initials}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {employee.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Співробітник #{employeeNumber}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {employee.formattedSalary}
                  </p>
                  <p className="text-sm text-gray-500">
                    на місяць
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </TaskLayout>
  );
};

export default TaskEmployees;
