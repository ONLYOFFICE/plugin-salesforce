import { useEffect } from 'preact/hooks';

interface Theme {
  type: 'light' | 'dark';
  name: string;
  [key: string]: string;
}

const COLOR_REGEX = /^(#([0-9a-f]{3}){1,2}|rgba?\([^)]+\)|hsl\([^)]+\))$/i;
const DARK_KEYWORDS = ['dark', 'night', 'contrast'];

function isDark(name = '', type = ''): boolean {
  return DARK_KEYWORDS.some((keyword) => name.includes(keyword) || type.includes(keyword));
}

function getThemeClasses(type = '', name = ''): string[] {
  const classes = [];
  
  if (name) classes.push(name);
  else if (type) classes.push(`theme-${type}`);
  
  if (type) classes.push(`theme-type-${type}`);
  if (!name) classes.push(isDark(name, type) ? 'theme-dark' : 'theme-light');
  
  return classes;
}

function applyThemeClasses(type: string, name: string): void {
  const newClasses = getThemeClasses(type, name);
  
  const body = document.body;
  if (!body) return;
  
  Array.from(body.classList)
    .filter((cls) => cls.startsWith('theme-'))
    .forEach((cls) => body.classList.remove(cls));
  
  newClasses.forEach((cls) => body.classList.add(cls));
}

function applyThemeVariables(theme: Record<string, string>): void {
  document.getElementById('theme-variables')?.remove();
  
  const vars = Object.entries(theme)
    .filter(([, value]) => COLOR_REGEX.test(value))
    .map(([key, value]) => {
      const cssKey = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      return `  ${cssKey}: ${value};`;
    });
  
  if (vars.length === 0) return;
  
  const style = document.createElement('style');
  style.id = 'theme-variables';
  style.textContent = `:root {\n${vars.join('\n')}\n}`;
  document.head.appendChild(style);
}

function applyTheme(theme: Theme): void {
  applyThemeClasses(theme.type, theme.name);
  applyThemeVariables(theme);
}

export function useTheme(): void {
  useEffect(() => {
    const plugin = window.Asc?.plugin;
    if (!plugin) return;
    
    const handler = (theme: Theme) => {
      plugin.onThemeChangedBase?.(theme);
      applyTheme(theme);
    };
    
    plugin.onThemeChanged = handler;
    plugin.attachEvent?.('onThemeChanged', handler);
    
    if (plugin.info?.theme) {
      applyTheme(plugin.info.theme);
    }
    
    return () => {
      plugin.detachEvent?.('onThemeChanged', handler);
      plugin.onThemeChanged = undefined;
    };
  }, []);
}
