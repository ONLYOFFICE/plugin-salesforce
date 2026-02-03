import { useState, useEffect } from 'preact/hooks';
import { hasValidSelection } from '@api/spreadsheet';
import { isPluginAvailable } from './usePluginReady';

const POLL_INTERVAL = 500;

export function useHasSelection(): boolean {
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    if (!isPluginAvailable()) {
      setHasSelection(false);
      return;
    }

    const checkSelection = async () => {
      if (!isPluginAvailable()) {
        setHasSelection(false);
        return;
      }

      try {
        const isValid = await hasValidSelection();
        setHasSelection(isValid);
      } catch (error) {
        setHasSelection(false);
      }
    };

    checkSelection();

    const interval = setInterval(checkSelection, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return hasSelection;
}
