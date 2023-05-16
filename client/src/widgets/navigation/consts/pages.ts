export const PAGES = {
  mainPage: { path: '/' },
  vtdTable: { path: 'vtdTable', params: { vtdId: 'vtdId', type: 'type' } },
  vtdManager: { path: 'vtdManager', name: 'Управление отчетами ВТД' },
};

export const NAV_LINKS = Object.values(PAGES);
