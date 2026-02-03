import { Button, Paragraph } from '@components';

import { useTranslation, useHasSelection } from '@hooks';

import './source.css';

interface SourceStepProps {
  loading: boolean;
  onLoadData: () => void;
}

export function SourceStep({ loading, onLoadData }: SourceStepProps) {
  const { t } = useTranslation();
  const hasSelection = useHasSelection();

  return (
    <div className="source-step">
      <div className="source-step__content">
        <Paragraph className="source-step__paragraph">
          {t('export.select_source_data_desc')}
        </Paragraph>
        <Paragraph className="source-step__paragraph">
          {t('export.first_row_headers_desc')}
        </Paragraph>
      </div>

      <div className="source-step__actions">
        <Button
          variant="primary"
          fullWidth
          onClick={onLoadData}
          disabled={loading || !hasSelection}
        >
          {loading ? t('common.loading') : t('export.load_data')}
        </Button>
      </div>
    </div>
  );
}
