import { FC, useCallback } from 'react';

import './modalWindows.styles.scss';
import useModalWindowsStore from './modalWindows.store';

const ModalWindows: FC = () => {
  const [modalWindows, removeModalWindow] = useModalWindowsStore((state) => [state.modalWindows, state.removeModalWindow]);

  const hideModalWindowOnAnimationEnd = useCallback((id: string) => removeModalWindow(id), [removeModalWindow]);

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
