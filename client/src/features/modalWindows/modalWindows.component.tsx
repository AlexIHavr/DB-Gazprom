import { FC, MouseEvent } from 'react';

import useModalWindowsStore from './modalWindows.store';
import styles from './modalWindows.module.scss';

const ModalWindows: FC = () => {
  const [modalWindows, removeModalWindow] = useModalWindowsStore((state) => [state.modalWindows, state.removeModalWindow]);

  const setAnimationPlayState = (e: MouseEvent<HTMLDivElement>, state: string) => {
    e.currentTarget.style.animationPlayState = state;
  };

  return (
    <div className={styles.modalWindows}>
      {modalWindows.map(({ id, message, type }) => (
        <div
          key={id}
          className={styles[type]}
          onAnimationEnd={() => removeModalWindow(id)}
          onMouseEnter={(e) => setAnimationPlayState(e, 'paused')}
          onMouseLeave={(e) => setAnimationPlayState(e, 'running')}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default ModalWindows;
