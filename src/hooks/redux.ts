import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Dispatch, Store } from '../redux/store';

export const useAppDispatch = () => useDispatch<Dispatch>();
export const useAppSelector: TypedUseSelectorHook<Store> = useSelector;
