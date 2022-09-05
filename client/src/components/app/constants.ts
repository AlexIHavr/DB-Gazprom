import { NavLinks } from './types';

export const PAGES = {
  main: { path: '/' },
  vtdForm: { path: `/vtdForm`, param: 'vtdId' },
  loadVtd: { path: '/loadVtd', param: 'vtdId' },
  loadLoir: { path: '/loadLoir', param: 'vtdId' },
  guides: { path: '/guides', name: 'Справочники' },
};

export const NAV_LINKS: NavLinks = Object.values(PAGES);
