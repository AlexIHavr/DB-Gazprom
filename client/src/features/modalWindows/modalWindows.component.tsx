import { FC, MouseEvent } from 'react';

import useModalWindowsStore from './modalWindows.store';
import styles from './modalWindows.module.scss';

const ModalWindows: FC = () => {
  const [modalWindows, removeModalWindow] = useModalWindowsStore((state) => [
    state.modalWindows,
    state.removeModalWindow,
  ]);

  const setAnimationPlayState = (e: MouseEvent<HTMLDivElement>, state: string): void => {
    e.currentTarget.style.animationPlayState = state;
  };

  return (
    <div className={styles.modalWindows}>
      {modalWindows.map(({ id, message, type }) => (
        <div
          key={id}
          className={styles[type]}
          onAnimationEnd={(): void => removeModalWindow(id)}
          onMouseEnter={(e): void => setAnimationPlayState(e, 'paused')}
          onMouseLeave={(e): void => setAnimationPlayState(e, 'running')}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default ModalWindows;
