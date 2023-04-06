import { FC } from 'react';

import VtdTreeWrapper from './components/vtdTreeWrapper/vtdTreeWrapper.component';
import useVtdTreeStore from './vtdTree.store';
import styles from './vtdTree.module.scss';

const VtdTree: FC = () => {
  const vtdTree = useVtdTreeStore((state) => state.vtdTree);

  return (
    <div className={styles.vtdTree}>
      <h1>Дерево ВТД</h1>
      <VtdTreeWrapper treeChildren={vtdTree} />
    </div>
  );
};

export default VtdTree;
