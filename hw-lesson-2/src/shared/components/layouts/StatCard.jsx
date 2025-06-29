import { THEME } from '../../constants/index.js';

const StatCard = ({ icon, title, value, color = 'blue', className = '' }) => {
  return (
    <div className={`${THEME.card} text-center ${className}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {title}
      </h3>
      <p className={`text-3xl font-bold text-${color}-600`}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;
