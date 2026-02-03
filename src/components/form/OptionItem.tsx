import './dropdown.css';

interface OptionItemProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function OptionItem({ label, selected, onSelect }: OptionItemProps) {
  const markerClass = selected ? 'dropdown__marker dropdown__marker--selected' : 'dropdown__marker';

  return (
    <div className="dropdown__item" onClick={onSelect}>
      <span className={markerClass} />
      <span>{label}</span>
    </div>
  );
}
