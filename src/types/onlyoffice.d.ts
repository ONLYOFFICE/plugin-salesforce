interface PluginWindow {
  show: (variation: PluginWindowVariation) => void;
  close: () => void;
}

interface PluginWindowVariation {
  url: string;
  description: string;
  buttons: { text: string; primary?: boolean }[];
  size: [number, number];
  isVisual: boolean;
  isModal: boolean;
  isDisplayedInViewer?: boolean;
  EditorsSupport: string[];
}

interface PluginTheme {
  type: 'light' | 'dark';
  name: string;
  [key: string]: string;
}

interface Plugin {
  button: (id: number | string) => void;
  callCommand: (
    func: () => void,
    isNoCalc?: boolean,
    isAsync?: boolean,
    callback?: (returnValue?: unknown) => void
  ) => void;
  attachEvent?: (event: string, callback: (data: unknown) => void) => void;
  detachEvent?: (event: string, callback: (data: unknown) => void) => void;
  onThemeChanged?: (theme: PluginTheme) => void;
  onThemeChangedBase?: (theme: PluginTheme) => void;
  info: {
    lang: string;
    theme: PluginTheme;
  };
}

interface ApiWorksheet {
  GetRange: (address: string) => ApiRange;
  SetActive: () => void;
}

interface ApiRange {
  SetValue: (value: string | number | boolean | null) => void;
  GetValue: () => string | number | boolean | null;
  GetRow: () => number;
  GetCol: () => number;
}

interface ApiGlobal {
  GetActiveSheet: () => ApiWorksheet;
  GetSheets: () => ApiWorksheet[];
  GetSheet: (name: string) => ApiWorksheet | null;
  AddSheet: (name?: string) => void;
  GetSelection: () => ApiRange | null;
}

declare global {
  interface Window {
    Asc: {
      PluginWindow: new () => PluginWindow;
      plugin: Plugin;
      scope?: Record<string, unknown>;
    };
  }

  const Asc: {
    scope?: Record<string, unknown>;
  };
  const Api: ApiGlobal;
}

export {};
