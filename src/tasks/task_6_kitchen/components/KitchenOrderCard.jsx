import Button from '../../../shared/components/Button.jsx';
import { THEME } from '../../../shared/constants/index.js';
import { BUTTON_LABELS } from '../constants.js';

const KitchenOrderCard = ({ order, onMove, onRemove, nextStatus, removeCondition, statusConfig }) => {
  const statusColor = statusConfig[order.status]?.color || 'bg-gray-50 border-gray-200 text-gray-800';
  const statusIcon = statusConfig[order.status]?.icon || '📄';

  return (
    <div className={`p-4 rounded-lg border-2 ${THEME.transition} hover:shadow-md ${statusColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-lg">{order.dish}</h4>
          <p className="text-sm opacity-75 mt-1">
            Створено: {order.createdAt}
          </p>
        </div>
        <div className="text-2xl ml-2">
          {statusIcon}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {nextStatus && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => onMove(order.id, nextStatus)}
          >
            {BUTTON_LABELS.NEXT} {statusConfig[nextStatus]?.label || nextStatus}
          </Button>
        )}

        {removeCondition && (
          <Button
            size="sm"
            variant="danger"
            onClick={() => onRemove(order.id)}
          >
            {BUTTON_LABELS.REMOVE}
          </Button>
        )}
      </div>
    </div>
  );
};

export default KitchenOrderCard;
