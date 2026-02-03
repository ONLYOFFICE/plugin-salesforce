export { initI18n, t, getCurrentLanguage, detectLanguage, loadTranslations } from './i18n';

export function openGuide(): void {
  window.open('https://api.onlyoffice.com/plugin/basic');
}
