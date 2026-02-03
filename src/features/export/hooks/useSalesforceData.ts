import { useState, useCallback } from 'preact/hooks';

import { useAuthentication } from '@features/authentication';

import {
  fetchObjects,
  describeObject,
  type SalesforceObject,
  type SalesforceField,
} from '@api/salesforce';

export function useSalesforceData() {
  const { state } = useAuthentication();

  const [objects, setObjects] = useState<SalesforceObject[]>([]);
  const [selectedObject, setSelectedObject] = useState('');
  const [fields, setFields] = useState<SalesforceField[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const credentials = state.value;

  const loadObjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    const res = await fetchObjects(credentials.instance_url, credentials.access_token);

    if (res.error) {
      setError(res.error.message);
    } else if (res.data) {
      const queryable = res.data.sobjects
        .filter((obj) => obj.queryable)
        .sort((a, b) => a.label.localeCompare(b.label));
      setObjects(queryable);
    }

    setLoading(false);
  }, [credentials]);

  const loadFields = useCallback(async (objectName: string) => {
    setLoading(true);
    setError(null);

    const res = await describeObject(credentials.instance_url, credentials.access_token, objectName);

    if (res.error) setError(res.error.message);
    else if (res.data) setFields(res.data.fields);

    setLoading(false);
  }, [credentials]);

  const selectObject = useCallback(async (objectName: string) => {
    setSelectedObject(objectName);
    await loadFields(objectName);
  }, [loadFields]);

  const clear = useCallback(() => {
    setSelectedObject('');
    setFields([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    objects,
    selectedObject,
    fields,
    loading,
    error,
    loadObjects,
    selectObject,
    clear,
    clearError,
  };
}
