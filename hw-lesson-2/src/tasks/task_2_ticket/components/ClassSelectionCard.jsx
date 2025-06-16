const ClassSelectionCard = ({ classConfig, isSelected, onSelect, ticketKey }) => {
  const buttonClasses = isSelected
    ? 'border-indigo-500 bg-indigo-50 shadow-lg transform scale-105'
    : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md hover:transform hover-scale-102';

  const iconContainerClasses = isSelected
    ? 'bg-indigo-500'
    : 'bg-gray-100 group-hover:bg-indigo-100';

  return (
    <button
      onClick={() => onSelect(ticketKey)}
      className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${buttonClasses}`}
    >
      <div className="flex items-center space-x-4 mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${iconContainerClasses}`}>
          <span className="text-2xl">{classConfig.icon}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{classConfig.title}</h3>
          <p className="text-gray-600">{classConfig.subtitle}</p>
        </div>
      </div>
    </button>
  );
};

export default ClassSelectionCard;
