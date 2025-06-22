import { getOptionCardClasses, getOptionTextClasses } from '../utils.js';

const EconomyClassOptions = ({ state, config, onBeerChange, onChipsChange }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center drop-shadow-sm">
          <span className="text-3xl mr-3">☁️</span>
          Economy Class Services
        </h2>

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🍺</span>
              <span className="text-lg font-semibold text-gray-800 capitalize">
                beer selection
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {config.beers.map((option) => (
                <label key={option} className="group relative">
                  <input
                    type="radio"
                    name="beer selection"
                    value={option}
                    checked={state.beerType === option}
                    onChange={(e) => onBeerChange(e.target.value)}
                    className="sr-only"
                  />
                  <div className={getOptionCardClasses(state.beerType === option)}>
                    <span className={getOptionTextClasses(state.beerType === option)}>
                      {option}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🥨</span>
              <span className="text-lg font-semibold text-gray-800 capitalize">
                snacks
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {config.chips.map((option) => (
                <label key={option} className="group relative">
                  <input
                    type="radio"
                    name="snacks"
                    value={option}
                    checked={state.chips === option}
                    onChange={(e) => onChipsChange(e.target.value)}
                    className="sr-only"
                  />
                  <div className={getOptionCardClasses(state.chips === option)}>
                    <span className={getOptionTextClasses(state.chips === option)}>
                      {option}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomyClassOptions;
