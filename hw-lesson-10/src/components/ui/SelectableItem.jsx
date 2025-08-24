import { BADGE_BASE, BADGE_VARIANTS, CARD_BASE, CARD_VARIANTS, SECONDARY_TEXT, clsx } from '@shared/styles.js';

export default function SelectableItem({
  item,
  isSelected,
  onToggle,
  variant,
  children
}) {
  const focusRing = variant === 'bus' ? 'focus:ring-blue-500' : 'focus:ring-emerald-500';

  return (
    <li>
      <button
        onClick={() => onToggle(item.id)}
        className={clsx(
          CARD_BASE,
          isSelected ? CARD_VARIANTS[variant].active : CARD_VARIANTS[variant].idle,
          focusRing
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium leading-tight">{item.name}</span>
          {isSelected && <span className={clsx(BADGE_BASE, BADGE_VARIANTS[variant])}>Selected</span>}
        </div>
        <p className={SECONDARY_TEXT}>{children}</p>
      </button>
    </li>
  );
}
