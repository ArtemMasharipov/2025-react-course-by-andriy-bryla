import SelectionPage from '@components/common/SelectionPage.jsx';
import { SelectionContext } from '@contexts/SelectionContext.js';
import { ThemeContext } from '@contexts/ThemeContext.js';
import { BUSES } from '@shared/constants.js';
import { useContext } from 'react';

export default function BusesPage() {
  const { selectedBuses, toggleBus } = useContext(SelectionContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div data-theme={theme}>
      <SelectionPage
        title="Select Buses"
        items={BUSES}
        selectedIds={selectedBuses}
        onToggle={toggleBus}
        variant="bus"
        renderMeta={(bus) => `Duration: ${bus.durationH}h · €${bus.price}`}
      />
    </div>
  );
}
