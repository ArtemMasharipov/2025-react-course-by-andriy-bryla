import { SelectionContext } from '@contexts/SelectionContext.js';
import { useLocalStorageState } from '@shared/useLocalStorageState.js';
import { useCallback, useMemo } from 'react';
const makeToggle = set => id => {
  set(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
};
const makeRemove = set => id => {
  set(prev => prev.filter(x => x !== id));
};

export function SelectionProvider({ children }) {
  const [selectedBuses, setSelectedBuses] = useLocalStorageState('app.selectedBuses', []);
  const [selectedHotels, setSelectedHotels] = useLocalStorageState('app.selectedHotels', []);

  const toggleBus = useCallback((id) => makeToggle(setSelectedBuses)(id), [setSelectedBuses]);
  const toggleHotel = useCallback((id) => makeToggle(setSelectedHotels)(id), [setSelectedHotels]);
  const removeBus = useCallback((id) => makeRemove(setSelectedBuses)(id), [setSelectedBuses]);
  const removeHotel = useCallback((id) => makeRemove(setSelectedHotels)(id), [setSelectedHotels]);
  const clearAll = useCallback(() => { setSelectedBuses([]); setSelectedHotels([]); }, [setSelectedBuses, setSelectedHotels]);

  const value = useMemo(() => ({
    selectedBuses,
    selectedHotels,
    toggleBus,
    toggleHotel,
    removeBus,
    removeHotel,
    clearAll,
  }), [selectedBuses, selectedHotels, toggleBus, toggleHotel, removeBus, removeHotel, clearAll]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export default SelectionProvider;
