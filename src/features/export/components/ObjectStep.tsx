import { useEffect, useMemo, useState } from 'preact/hooks';

import { Button, Label, Autocomplete } from '@components';

import { SheetSummary } from '@features/export/components/SheetSummary';

import { useTranslation } from '@hooks';

import type { SalesforceObject } from '@api/salesforce';
import type { SheetData } from '@api/spreadsheet';

import './object.css';

interface ObjectStepProps {
  sheetData: SheetData;
  objects: SalesforceObject[];
  loading: boolean;
  error?: string | null;
  onLoadObjects: () => void;
  onSelect: (objectName: string) => void;
  onBack: () => void;
}

export function ObjectStep({
  sheetData,
  objects,
  loading,
  error,
  onLoadObjects,
  onSelect,
  onBack,
}: ObjectStepProps) {
  const { t } = useTranslation();
  const [selectedObject, setSelectedObject] = useState<string>('');
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  useEffect(() => {
    if (objects.length === 0 && !loading) onLoadObjects();
  }, [objects.length, loading, onLoadObjects]);

  const handleFocus = () => {
    if ((objects.length === 0 || error) && !loading) onLoadObjects();
  };

  const objectOptions = useMemo(
    () => objects.map((obj) => ({
      value: obj.name,
      label: `${obj.label} (${obj.name})`,
      searchText: `${obj.label} ${obj.name}`,
    })),
    [objects],
  );

  const handleSelect = (value: string, label: string) => {
    setSelectedObject(value);
    setSelectedLabel(label);
  };

  const handleNext = () => {
    if (selectedObject) {
      onSelect(selectedObject);
    }
  };

  return (
    <div className="object-step">
      <SheetSummary sheetData={sheetData} />

      <div className="object-step__divider" />

      <section className="object-step__section">
        <Label>{t('export.select_target_salesforce_object')}</Label>
      </section>

      <div className="object-step__input">
        <Autocomplete
          options={objectOptions}
          value={selectedLabel}
          placeholder={loading ? t('export.loading_data') : t('export.enter_or_select_object')}
          disabled={loading}
          onChange={handleSelect}
          onFocus={handleFocus}
        />
      </div>

      <footer className="object-step__footer">
        <Button
          variant="primary"
          fullWidth
          onClick={handleNext}
          disabled={!selectedObject || loading}
        >
          {t('common.next')}
        </Button>
      </footer>
    </div>
  );
}
