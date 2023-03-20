import { useAppSelector } from 'hooks/redux';

import VtdTreeWrapper from './components/vtdTreeWrapper/vtdTreeWrapper.component';
import './vtdTree.styles.scss';

const VtdTree: React.FC = () => {
  const { vtdTree } = useAppSelector((state) => state.vtds);

  return (
    <div className="vtds">
      <h1>Дерево ВТД</h1>
      <VtdTreeWrapper treeChildren={vtdTree} />
    </div>
  );
};

export default VtdTree;
