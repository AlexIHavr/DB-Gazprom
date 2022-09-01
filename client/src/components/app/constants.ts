import { NavLinks } from './types';

export const PAGES = {
  main: { path: '/', logo: true },
  vtdForm: { path: `/vtdForm`, param: 'vtdId' },
  loadVtd: { path: '/loadVtd', name: 'Внесение данных ВТД' },
  loadLoir: { path: '/loadLoir', name: 'Внесение данных ЛОиР' },
  guides: { path: '/guides', name: 'Справочники' },
};

export const NAV_LINKS: NavLinks = Object.values(PAGES);
