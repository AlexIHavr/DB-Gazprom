import { FC, memo } from 'react';

import { ChangeSizeToolProps } from '../../types/props';
import usePipelineTableStore from '../../pipelineTable.store';

import styles from './changeSizeTool.module.scss';

const ChangeSizeTool: FC<ChangeSizeToolProps> = ({ vtdId, type, index, minWidth, width }) => {
  const setColumnProperties = usePipelineTableStore((state) => state.setColumnProperties);

  const onMouseDownChangeSizeTool = (e: React.MouseEvent) => {
    if (e.button) return;

    const parentElem = (e.target as HTMLDivElement).parentElement;
    let startPageX = e.pageX;
    let columnWidth = width;

    const onMouseMove = (event: MouseEvent) => {
      if (parentElem) {
        columnWidth = parentElem.offsetWidth + event.pageX - startPageX;

        if (columnWidth < minWidth) columnWidth = minWidth;

        parentElem.style.maxWidth = columnWidth + 'px';
        parentElem.style.minWidth = columnWidth + 'px';
        startPageX = event.pageX;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener(
      'mouseup',
      () => {
        setColumnProperties({ vtdId, type, index, properties: { width: columnWidth } });
        window.removeEventListener('mousemove', onMouseMove);
      },
      { once: true },
    );
  };

  return <div className={styles.changeSizeTool} onMouseDown={onMouseDownChangeSizeTool}></div>;
};

export default memo(ChangeSizeTool);
