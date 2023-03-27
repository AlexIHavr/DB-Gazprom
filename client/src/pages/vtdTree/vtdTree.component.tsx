import { FC } from 'react';

import VtdTreeWrapper from './components/vtdTreeWrapper/vtdTreeWrapper.component';
import useVtdTreeStore from './vtdTree.store';

import './vtdTree.styles.scss';

const VtdTree: FC = () => {
  const vtdTree = useVtdTreeStore((state) => state.vtdTree);

  return (
    <div className="vtds">
      <h1>Дерево ВТД</h1>
      <VtdTreeWrapper treeChildren={vtdTree} />
    </div>
  );
};

export default VtdTree;
