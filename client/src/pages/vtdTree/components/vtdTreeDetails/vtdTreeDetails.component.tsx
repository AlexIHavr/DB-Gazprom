import { useCallback, memo, Dispatch, SetStateAction, FC } from 'react';
import { VtdTreeLevels } from 'redux/vtds/types';

import { VtdTreeRootProps } from '../vtdTreeRoot/vtdTreeRoot.component';
import './vtdTreeDetails.styles.scss';

type VtdTreeDetailsProps = Omit<VtdTreeRootProps, 'useH3'> & {
  levelsExpanded: VtdTreeLevels;
  levelsHeight: VtdTreeLevels;
  setLevelsHeight: Dispatch<SetStateAction<VtdTreeLevels>>;
};

const VtdTreeDetails: FC<VtdTreeDetailsProps> = ({ children, header, level, levelsExpanded, levelsHeight, setLevelsHeight }) => {
  const setLevelHeightOnTransitionEnd = useCallback(
    () => setLevelsHeight((prev) => ({ ...prev, [level]: 'auto' })),
    [level, setLevelsHeight],
  );

  return (
    <div
      className="details"
      style={{ height: levelsExpanded[level] === header ? levelsHeight[level] : 0 }}
      onTransitionEnd={setLevelHeightOnTransitionEnd}
    >
      {children}
    </div>
  );
};

export default memo(VtdTreeDetails);
