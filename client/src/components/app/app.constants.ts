import { NavLinks } from './app.types';

export const PAGES = {
  main: { path: '/' },
  vtdTable: { path: '/vtdTable', params: { vtdId: 'vtdId', tableType: 'tableType' } },
  guides: { path: '/guides' },
};

export const NAV_LINKS: NavLinks = Object.values(PAGES);
