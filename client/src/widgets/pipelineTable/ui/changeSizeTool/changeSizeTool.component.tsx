import { useAppDispatch } from 'hooks/redux';
import { FC, memo, useCallback } from 'react';
import { setColumnProperties } from 'redux/vtds/reducer';
import { PipelineColumnProps } from 'redux/vtds/types';

import './changeSizeTool.styles.scss';

const ChangeSizeTool: FC<PipelineColumnProps> = ({ vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();

  const onMouseDownChangeSizeTool = useCallback(
    (e: React.MouseEvent) => {
      if (e.button || !vtdId || !tableType) return;

      const parentElem = (e.target as HTMLDivElement).parentElement;
      let startPageX = e.pageX;
      let width = column.width;

      const onMouseMove = (event: MouseEvent) => {
        if (parentElem) {
          width = parentElem.offsetWidth + event.pageX - startPageX;

          if (width < column.minWidth) width = column.minWidth;

          parentElem.style.maxWidth = width + 'px';
          parentElem.style.minWidth = width + 'px';
          startPageX = event.pageX;
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener(
        'mouseup',
        () => {
          dispatch(setColumnProperties({ vtdId, tableType, columnIndex: column.index, properties: { width } }));
          window.removeEventListener('mousemove', onMouseMove);
        },
        { once: true },
      );
    },
    [column.width, column.minWidth, column.index, dispatch, vtdId, tableType],
  );

  return <div className="changeSizeTool" onMouseDown={onMouseDownChangeSizeTool}></div>;
};

export default memo(ChangeSizeTool);
