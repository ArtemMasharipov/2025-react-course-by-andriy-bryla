import { useState } from 'react';
import TaskDescription from '../../shared/components/TaskDescription.jsx';
import TaskLayout from '../../shared/components/layouts/TaskLayout.jsx';
import { getTicketBackgroundUrl } from '../../shared/utils/cloudinary.js';

import BusinessClassOptions from './components/BusinessClassOptions.jsx';
import ClassSelectionCard from './components/ClassSelectionCard.jsx';
import EconomyClassOptions from './components/EconomyClassOptions.jsx';
import { TICKET_CLASSES, TICKET_CONFIG } from './constants/constants.js';

const CLASS_ENTRIES = Object.entries(TICKET_CONFIG);

const SummaryCard = ({ state }) => {
  const isBusinessClass = state.ticketClass === TICKET_CLASSES.BUSINESS;
  const showCard = !!state.ticketClass;

  if (!showCard) return null;

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 shadow-lg animate-fade-in">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">✈️</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Your Selection</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">Class:</span>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            {TICKET_CONFIG[state.ticketClass].title}
          </span>
        </div>

        {isBusinessClass && (
          <>
            {state.newspaper && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Newspaper: {state.newspaper}</span>
              </div>
            )}
            {state.cognac && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Premium Cognac: Yes</span>
              </div>
            )}
            {state.cognac && state.snack && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Gourmet Snacks: {state.snack === 'yes' ? 'Yes' : 'No'}</span>
              </div>
            )}
          </>
        )}

        {!isBusinessClass && (
          <>
            {state.beerType && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Beer: {state.beerType}</span>
              </div>
            )}
            {state.chips && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Snacks: {state.chips}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const TaskTicket = () => {
  const [state, setState] = useState({
    ticketClass: '',
    newspaper: '',
    cognac: false,
    snack: '',
    beerType: '',
    chips: '',
  });

  const updateTicketClass = ticketClass => {
    setState({
      ticketClass,
      newspaper: '',
      cognac: false,
      snack: '',
      beerType: '',
      chips: '',
    });
  };

  const updateSelection = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const config = TICKET_CONFIG[state.ticketClass] || {};

  const getTicketCardStyles = () => {
    const selectedConfig = TICKET_CONFIG[state.ticketClass];
    if (selectedConfig) {
      const { cloudinaryType } = selectedConfig;
      return {
        backgroundImage: `url(${getTicketBackgroundUrl(cloudinaryType)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return {};
  };

  const defaultBackgroundClass = 'bg-gradient-to-br from-gray-100 to-blue-200';
  const backgroundClass = TICKET_CONFIG[state.ticketClass]?.backgroundClass || defaultBackgroundClass;

  const showBusinessOptions = state.ticketClass === TICKET_CLASSES.BUSINESS;
  const showEconomyOptions = state.ticketClass === TICKET_CLASSES.ECONOMY;

  return (
    <TaskLayout backgroundClass={backgroundClass}>
      <TaskDescription taskId={2} />

      <div
        className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 relative overflow-hidden transition-all duration-700 ease-in-out"
        style={getTicketCardStyles()}
      >
        <div className="relative z-10">
          <div className="mb-8">
            <label className="block text-2xl font-bold mb-6 text-gray-800 drop-shadow-sm">
              Select Your Class
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CLASS_ENTRIES.map(([key, classConfig]) => (
                <ClassSelectionCard
                  key={key}
                  ticketKey={key}
                  classConfig={classConfig}
                  isSelected={state.ticketClass === key}
                  onSelect={updateTicketClass}
                />
              ))}
            </div>
          </div>

          {showBusinessOptions && (          <BusinessClassOptions
            state={state}
            config={config}
            onNewspaperChange={(value) => updateSelection('newspaper', value)}
            onCognacChange={(value) => updateSelection('cognac', value)}
            onSnackChange={(value) => updateSelection('snack', value)}
          />
        )}

        {showEconomyOptions && (
          <EconomyClassOptions
            state={state}
            config={config}
            onBeerChange={(value) => updateSelection('beerType', value)}
            onChipsChange={(value) => updateSelection('chips', value)}
          />
        )}

          <SummaryCard state={state} />
        </div>
      </div>
    </TaskLayout>
  );
};

export default TaskTicket;
