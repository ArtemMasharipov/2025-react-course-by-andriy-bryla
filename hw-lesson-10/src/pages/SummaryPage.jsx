import SelectedGroup from '@components/summary/SelectedGroup.jsx';
import { SelectionContext } from '@contexts/SelectionContext.js';
import { ThemeContext } from '@contexts/ThemeContext.js';
import { BUSES, HOTELS } from '@shared/constants.js';
import { useContext } from 'react';

export default function SummaryPage() {
  const { selectedBuses, selectedHotels, clearAll, removeBus, removeHotel } = useContext(SelectionContext);
  const { theme } = useContext(ThemeContext);
  const empty = !selectedBuses.length && !selectedHotels.length;
  if (empty) {
    return (
      <div className="text-center py-12 opacity-60" data-theme={theme}>
        <p>No buses or hotels selected yet.</p>
        <p className="text-sm mt-1">Visit Buses and Hotels pages to make selections.</p>
      </div>
    );
  }
  const busItems = BUSES.filter(b => selectedBuses.includes(b.id));
  const hotelItems = HOTELS.filter(h => selectedHotels.includes(h.id));
  return (
    <div className="space-y-6" data-theme={theme}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Your Selection</h2>
        <button onClick={clearAll} className="text-sm px-3 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-500/50">Clear All</button>
      </div>
      <SelectedGroup
        title="Selected Buses"
        variant="bus"
        items={busItems}
        renderMeta={(b) => `Duration: ${b.durationH}h · €${b.price}`}
        remove={id => removeBus(id)}
      />
      <SelectedGroup
        title="Selected Hotels"
        variant="hotel"
        items={hotelItems}
        renderMeta={(h) => `${h.city} · ${'★'.repeat(h.stars)} · €${h.price}/night`}
        remove={id => removeHotel(id)}
      />
    </div>
  );
}
