import SelectionPage from '@components/common/SelectionPage.jsx';
import { SelectionContext } from '@contexts/SelectionContext.js';
import { ThemeContext } from '@contexts/ThemeContext.js';
import { HOTELS } from '@shared/constants.js';
import { useContext } from 'react';

export default function HotelsPage() {
  const { selectedHotels, toggleHotel } = useContext(SelectionContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div data-theme={theme}>
      <SelectionPage
        title="Select Hotels"
        items={HOTELS}
        selectedIds={selectedHotels}
        onToggle={toggleHotel}
        variant="hotel"
        renderMeta={(hotel) => `${hotel.city} · ${'★'.repeat(hotel.stars)} · €${hotel.price}/night`}
      />
    </div>
  );
}
