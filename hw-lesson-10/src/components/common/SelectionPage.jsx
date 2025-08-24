import SelectableList from '@components/ui/SelectableList.jsx';

export default function SelectionPage({ title, items, selectedIds, onToggle, variant, renderMeta }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{title}</h2>
      <SelectableList
        items={items}
        selectedIds={selectedIds}
        onToggle={onToggle}
        variant={variant}
        renderMeta={renderMeta}
      />
    </div>
  );
}
