import { THEME } from '../../../shared/constants/index.js';
import { YES_NO_OPTIONS } from '../constants/constants.js';
import { getOptionCardClasses, getOptionTextClasses } from '../utils.js';

const YesNoQuestion = ({ question, value, onChange }) => (
  <div className="space-y-4">
    <label className="block text-lg font-semibold text-gray-700">{question}</label>
    <div className="space-y-2">
      {YES_NO_OPTIONS.map(option => (
        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="snack"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const BusinessClassOptions = ({ state, config, onNewspaperChange, onCognacChange, onSnackChange }) => {
  const showSnackQuestion = state.cognac;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center drop-shadow-sm">
          <span className="text-3xl mr-3">✈️</span>
          Business Class Amenities
        </h2>

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">📰</span>
              <span className="text-lg font-semibold text-gray-800 capitalize">
                newspaper
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {config.newspapers.map((option) => (
                <label key={option} className="group relative">
                  <input
                    type="radio"
                    name="newspaper"
                    value={option}
                    checked={state.newspaper === option}
                    onChange={(e) => onNewspaperChange(e.target.value)}
                    className="sr-only"
                  />
                  <div className={getOptionCardClasses(state.newspaper === option)}>
                    <span className={getOptionTextClasses(state.newspaper === option)}>
                      {option}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <label className={`group flex items-center space-x-4 p-4 rounded-xl bg-white border-2 border-gray-200 cursor-pointer ${THEME.transition} hover:border-indigo-300 hover:shadow-sm`}>
            <input
              type="checkbox"
              checked={state.cognac}
              onChange={(e) => onCognacChange(e.target.checked)}
              className="sr-only"
            />

            <div className={`
              w-6 h-6 rounded-lg border-2 flex items-center justify-center ${THEME.transition}
              ${state.cognac
                ? 'border-indigo-500 bg-indigo-500'
                : 'border-gray-300 group-hover:border-indigo-400'
              }
            `}>
              {state.cognac && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            <span className="text-2xl">🍷</span>

            <span className="text-lg font-medium text-gray-800">Premium Cognac Selection</span>
          </label>

          {showSnackQuestion && (
            <YesNoQuestion
              question="Would you like gourmet snacks with your cognac?"
              value={state.snack}
              onChange={onSnackChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessClassOptions;
