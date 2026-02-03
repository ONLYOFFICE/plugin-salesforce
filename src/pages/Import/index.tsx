import { useEffect } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import {
  Layout, Header, Footer, LoadingIndicator, SuccessMessage, PageTransition,
} from '@components';

import {
  ObjectStep,
  FieldStep,
  FilterStep,
  useImport,
} from '@features/import';
import { useAuthentication } from '@features/authentication';

import { useTranslation } from '@hooks';

export function Import() {
  const { route } = useLocation();
  const { t, isReady } = useTranslation();
  const { isAuthenticated } = useAuthentication();

  const {
    objectsLoading,
    fieldsLoading,
    error,
    step,
    objects,
    selectedObjects,
    toggleObject,
    validationError,
    fields,
    selected,
    toggle,
    setSelectedFields,
    filters,
    addFilter,
    updateFilter,
    removeFilter,
    maxRows,
    setMaxRows,
    goTo,
    canNext,
    submit,
    openSoqlEditor,
    reload,
    reset,
    clearError,
  } = useImport();

  useEffect(() => {
    if (!isAuthenticated.value) route('/login');
  }, [route, isAuthenticated.value]);

  if (!isReady) {
    return (
      <Layout
        header={<Header title="" onBack={() => route('/')} />}
        footer={<Footer onConfigure={() => route('/settings')} />}
      >
        <></>
      </Layout>
    );
  }

  const renderContent = () => {
    switch (step) {
      case 'object':
        return (
          <ObjectStep
            objects={objects}
            selectedObjects={selectedObjects}
            onToggle={toggleObject}
            loading={objectsLoading}
            canNext={canNext}
            validationError={validationError}
            onNext={() => goTo('fields')}
            onSOQL={openSoqlEditor}
          />
        );

      case 'fields':
        return (
          <FieldStep
            objects={objects}
            selectedObjects={selectedObjects}
            fields={fields}
            selected={selected}
            loading={fieldsLoading}
            canSubmit={selected.length > 0}
            filters={filters}
            maxRows={maxRows}
            error={error}
            onToggle={toggle}
            onSetSelected={setSelectedFields}
            onEditObjects={() => goTo('object')}
            onAddFilter={addFilter}
            onUpdateFilter={updateFilter}
            onRemoveFilter={removeFilter}
            onMaxRowsChange={setMaxRows}
            onSubmit={submit}
            onSOQL={openSoqlEditor}
            onClearError={clearError}
          />
        );

      case 'filters':
        return (
          <FilterStep
            fields={selected}
            filters={filters}
            maxRows={maxRows}
            onEditFields={() => goTo('fields')}
            onAddFilter={addFilter}
            onUpdateFilter={updateFilter}
            onRemoveFilter={removeFilter}
            onMaxRowsChange={setMaxRows}
            onSubmit={submit}
            onSOQL={openSoqlEditor}
          />
        );

      case 'loading':
        return <LoadingIndicator message={t('common.loading')} />;

      case 'success':
        return (
          <SuccessMessage
            message={t('import.import_completed_success')}
            actions={[
              { label: t('common.reload'), onClick: reload },
              { label: t('import.import_new_data'), onClick: reset },
            ]}
          />
        );

      default:
        return null;
    }
  };

  const isLoading = step === 'loading';
  const isSuccess = step === 'success';

  const getHeader = () => {
    if (isLoading) return null;
    if (isSuccess) return <Header title="" onBack={() => route('/')} />;
    return <Header title={t('import.title')} onBack={() => route('/')} />;
  };

  return (
    <Layout
      header={getHeader()}
      footer={isLoading ? null : <Footer onConfigure={() => route('/settings')} />}
    >
      <PageTransition step={step}>
        {renderContent()}
      </PageTransition>
    </Layout>
  );
}
