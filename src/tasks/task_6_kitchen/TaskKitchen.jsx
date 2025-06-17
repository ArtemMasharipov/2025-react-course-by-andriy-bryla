import Button from '../../shared/components/Button.jsx';
import Input from '../../shared/components/Input.jsx';
import TaskDescription from '../../shared/components/TaskDescription.jsx';
import StatCard from '../../shared/components/layouts/StatCard.jsx';
import TaskLayout from '../../shared/components/layouts/TaskLayout.jsx';
import { THEME } from '../../shared/constants/index.js';

import KitchenColumn from './components/KitchenColumn.jsx';

import {
  KANBAN_COLUMNS,
  ORDER_STATUS,
  STATUS_CONFIG,
  getNextStatus,
  getRemoveCondition,
  getStatsCards
} from './constants.js';
import { useKitchen } from './useKitchen.js';

const TaskKitchen = () => {
  const {
    newDish,
    setNewDish,
    getOrdersByStatus,
    moveOrder,
    removeOrder,
    handleSubmit
  } = useKitchen();

  const waitingOrders = getOrdersByStatus(ORDER_STATUS.WAITING);
  const processingOrders = getOrdersByStatus(ORDER_STATUS.PROCESSING);
  const completedOrders = getOrdersByStatus(ORDER_STATUS.COMPLETED);

  const handleNewDishChange = (e) => setNewDish(e.target.value);

  const statsCards = getStatsCards(
    waitingOrders.length,
    processingOrders.length,
    completedOrders.length
  );

  return (
    <TaskLayout>
      <TaskDescription taskId={6} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>

      <div className={`${THEME.card} mb-8`}>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            value={newDish}
            onChange={handleNewDishChange}
            placeholder="Назва страви..."
            className="flex-1"
            required
          />
          <Button type="submit" variant="primary">
            Додати
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {KANBAN_COLUMNS.map(column => (
          <KitchenColumn
            key={column.key}
            title={column.title}
            icon={column.icon}
            orders={getOrdersByStatus(column.status)}
            emptyText={column.emptyText}
            onMoveOrder={moveOrder}
            onRemoveOrder={removeOrder}
            getNextStatus={getNextStatus}
            getRemoveCondition={getRemoveCondition}
            statusConfig={STATUS_CONFIG}
          />
        ))}
      </div>
    </TaskLayout>
  );
};

export default TaskKitchen;
