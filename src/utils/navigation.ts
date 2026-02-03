const GUIDE_URL = 'https://onlyoffice.com';

export function openGuide(): void {
  window.open(GUIDE_URL, '_blank');
}

export function openExternalLink(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openPopup(
  url: string,
  name: string,
  options: { width?: number; height?: number } = {},
): Window | null {
  const { width = 500, height = 700 } = options;
  return window.open(url, name, `width=${width},height=${height}`);
}
