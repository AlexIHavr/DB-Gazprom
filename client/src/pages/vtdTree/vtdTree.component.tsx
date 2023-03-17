import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { PAGES } from 'shared';
import { TABLE_TYPES, TABLE_TYPES_KEYS, VTD_TREE_LEVELS } from 'redux/vtds/constants';

import VtdTreeRoot from './components/vtdTreeRoot/vtdTreeRoot.component';
import './vtdTree.styles.scss';

const VtdTree: React.FC = () => {
  const { vtdTree } = useAppSelector((state) => state.vtds);

  return (
    <div className="vtds">
      <h1>Дерево ВТД</h1>
      {vtdTree.map(({ type, pipelines }) => (
        <VtdTreeRoot key={type} header={type} level={VTD_TREE_LEVELS.type} useH3>
          {pipelines.map(({ pipeline, sections }) => (
            <VtdTreeRoot key={pipeline} header={pipeline} level={VTD_TREE_LEVELS.pipeline}>
              {sections.map(({ section, years }) => (
                <VtdTreeRoot key={section} header={section} level={VTD_TREE_LEVELS.section}>
                  {years.map(({ id, year }) => (
                    <VtdTreeRoot key={year} header={year} level={VTD_TREE_LEVELS.year}>
                      {TABLE_TYPES_KEYS.map((tableType) => (
                        <NavLink key={tableType} to={`${PAGES.vtdTable.path}/${id}/${tableType}`}>
                          <span>{TABLE_TYPES[tableType].name}</span>
                        </NavLink>
                      ))}
                    </VtdTreeRoot>
                  ))}
                </VtdTreeRoot>
              ))}
            </VtdTreeRoot>
          ))}
        </VtdTreeRoot>
      ))}
    </div>
  );
};

export default VtdTree;
