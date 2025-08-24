import SelectableItem from '@components/ui/SelectableItem.jsx';

export default function SelectableList({
  items,
  selectedIds,
  onToggle,
  variant,
  renderMeta
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map(item => (
        <SelectableItem
          key={item.id}
          item={item}
          isSelected={selectedIds.includes(item.id)}
          onToggle={onToggle}
          variant={variant}
        >
          {renderMeta(item)}
        </SelectableItem>
      ))}
    </ul>
  );
}
