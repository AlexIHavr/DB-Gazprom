import { FC } from 'react';

import useModalWindowsStore from './modalWindows.store';
import styles from './modalWindows.module.scss';

const ModalWindows: FC = () => {
  const [modalWindows, removeModalWindow] = useModalWindowsStore((state) => [state.modalWindows, state.removeModalWindow]);

  return (
    <div className={styles.modalWindows}>
      {modalWindows.map(({ id, message, type }) => (
        <div key={id} className={type} onAnimationEnd={() => removeModalWindow(id)}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default ModalWindows;
