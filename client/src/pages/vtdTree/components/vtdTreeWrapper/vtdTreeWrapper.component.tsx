import { FC, memo } from 'react';
import { VTD_TREE_LEVELS_KEYS } from 'redux/vtds/constants';

import VtdTreeRoot from '../vtdTreeRoot/vtdTreeRoot.component';
import VtdTreeTableTypes from '../vtdTreeTableTypes/vtdTreeTableTypes.component';
import { VtdTree } from '../../vtdTree.types';

type VtdTreeWrapperProps = {
  treeChildren: VtdTree;
  levelIndex?: number;
};

const VtdTreeWrapper: FC<VtdTreeWrapperProps> = ({ treeChildren, levelIndex = 0 }) => {
  return (
    <>
      {treeChildren.map(({ header, children, id }) => (
        <VtdTreeRoot key={header} header={header} level={VTD_TREE_LEVELS_KEYS[levelIndex]} useH3={!levelIndex}>
          {children ? (
            <VtdTreeWrapper treeChildren={children} levelIndex={levelIndex + 1}></VtdTreeWrapper>
          ) : (
            id && <VtdTreeTableTypes id={id}></VtdTreeTableTypes>
          )}
        </VtdTreeRoot>
      ))}
    </>
  );
};

export default memo(VtdTreeWrapper);
