import { THEME } from '../../../shared/constants/index.js';
import KitchenOrderCard from './KitchenOrderCard.jsx';

const KitchenColumn = ({ title, icon, orders, emptyText, onMoveOrder, onRemoveOrder, getNextStatus, getRemoveCondition, statusConfig }) => {
  return (
    <div className={THEME.card}>
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {orders.length}
        </span>
      </div>

      <div className="space-y-3">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-8">{emptyText}</p>
        ) : (
          orders.map(order => (
            <KitchenOrderCard
              key={order.id}
              order={order}
              onMove={onMoveOrder}
              onRemove={onRemoveOrder}
              nextStatus={getNextStatus(order.status)}
              removeCondition={getRemoveCondition(order.status)}
              statusConfig={statusConfig}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KitchenColumn;
