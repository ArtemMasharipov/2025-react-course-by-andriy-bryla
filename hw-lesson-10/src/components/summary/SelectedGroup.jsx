import { CARD_VARIANTS, SECONDARY_TEXT, clsx } from '@shared/styles.js';

export default function SelectedGroup({ title, items, variant, renderMeta, remove }) {
  if (!items.length) return null;
  const summaryVariant = variant === 'bus' ? CARD_VARIANTS.summary.bus : CARD_VARIANTS.summary.hotel;
  const titleColor = variant === 'bus'
    ? 'text-blue-700 dark:text-blue-300'
    : 'text-emerald-700 dark:text-emerald-300';
  return (
    <section aria-label={title}>
      <h3 className={clsx('font-semibold mb-3 tracking-tight', titleColor)}>{title} ({items.length})</h3>
      <ul className="space-y-2">
        {items.map(it => (
          <li key={it.id} className={clsx('flex items-center justify-between p-3 rounded-md border', summaryVariant)}>
            <div>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{it.name}</span>
              <p className={SECONDARY_TEXT}>{renderMeta(it)}</p>
            </div>
            <button
              onClick={() => remove(it.id)}
              className="text-xs px-2 py-1 rounded bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/60 transition-colors"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
