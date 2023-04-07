import { FC, useEffect } from 'react';

import useVtdTableStore from '../vtdTable/vtdTable.store';

import VtdTreeWrapper from './components/vtdTreeWrapper/vtdTreeWrapper.component';
import useVtdTreeStore from './vtdTree.store';
import styles from './vtdTree.module.scss';
import { getVtdTree } from './helpers/getVtdTree';

const VtdTree: FC = () => {
  const vtds = useVtdTableStore((state) => state.vtds);
  const [vtdTree, setVtdTree] = useVtdTreeStore((state) => [state.vtdTree, state.setVtdTree]);

  useEffect(() => {
    if (vtds.length) setVtdTree(getVtdTree(vtds));
  }, [vtds, setVtdTree]);

  return (
    <div className={styles.vtdTree}>
      <h1>Дерево ВТД</h1>
      {!!vtdTree.length && <VtdTreeWrapper treeChildren={vtdTree} />}
    </div>
  );
};

export default VtdTree;
