import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { removeModalWindow } from 'redux/app/reducer';

import './modalWindows.styles.scss';

const ModalWindows = () => {
  const dispatch = useAppDispatch();
  const { modalWindows } = useAppSelector((state) => state.app);

  const hideModalWindowOnAnimationEnd = useCallback((id: string) => dispatch(removeModalWindow(id)), [dispatch]);

  return (
    <div className="modalWindows">
      {modalWindows.map(({ id, message, type }) => (
        <div key={id} className={type} onAnimationEnd={() => hideModalWindowOnAnimationEnd(id)}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default ModalWindows;
