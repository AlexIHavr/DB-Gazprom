import { NavLinks } from '../types/navLinks';

export const PAGES = {
  mainPage: { path: '/' },
  vtdTable: { path: 'vtdTable', params: { vtdId: 'vtdId', type: 'type' } },
  guides: { path: 'guides', name: 'Справочники' },
};

export const NAV_LINKS: NavLinks = Object.values(PAGES);
