import { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { PAGES } from '../../constants';
import { useAppSelector } from '../../../../hooks/redux';
import { getAdaptedVtdTree } from '../../../../helpers/vtdTree';
import { ReactComponent as AngleDownSolid } from '../../../../assets/svg/angleDownSolid.svg';

import { VTD_TREE_LEVELS } from './constants';
import { VtdTreeLevels } from './types';

import './vtdTree.scss';

const VtdTree: React.FC = () => {
  const { vtdTree } = useAppSelector((state) => state.vtdTree);
  const [levelsExpanded, setLevelsExpanded] = useState(VTD_TREE_LEVELS);
  const [levelsHeight, setLevelsHeight] = useState(VTD_TREE_LEVELS);

  const setLevelExpandedOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, panel: string, level: VtdTreeLevels) => {
      e.stopPropagation();

      const detailsHeight = Array.from(e.currentTarget.lastElementChild?.children || []).reduce((sum, elem) => {
        sum += (elem as HTMLDivElement).offsetHeight;
        return sum;
      }, 0);
      const newLevel = levelsExpanded[level] !== panel ? panel : null;

      setLevelsHeight((prev) => ({ ...prev, [level]: detailsHeight }));
      setLevelsExpanded({ ...levelsExpanded, [level]: newLevel });
    },
    [levelsExpanded],
  );

  const setLevelHeightOnTransitionEnd = useCallback(
    (level: VtdTreeLevels) => setLevelsHeight((prev) => ({ ...prev, [level]: 'auto' })),
    [],
  );

  const adaptedVtdTree = useMemo(() => getAdaptedVtdTree(vtdTree), [vtdTree]);

  const hideAllLevels = useCallback(() => {
    for (const levelExpanded in levelsExpanded) {
      if (levelsExpanded[levelExpanded as VTD_TREE_LEVELS]) setLevelsExpanded((prev) => ({ ...prev, [levelExpanded]: null }));
    }
  }, [levelsExpanded]);

  useEffect(() => {
    document.addEventListener('click', hideAllLevels);

    return () => {
      document.removeEventListener('click', hideAllLevels);
    };
  }, [hideAllLevels]);

  return (
    <div className="vtdTree">
      <h1>Дерево ВТД</h1>
      {adaptedVtdTree.map(({ type, pipelines }) => (
        <div className="root typeAccordion" key={type} onClick={(e) => setLevelExpandedOnClick(e, type, VTD_TREE_LEVELS.type)}>
          <div className="content">
            <h3>{type}</h3>
            <AngleDownSolid className={classNames({ rotate: levelsExpanded.type === type })} />
          </div>

          <div
            className="details"
            style={{ height: levelsExpanded.type === type ? levelsHeight.type : 0 }}
            onTransitionEnd={() => setLevelHeightOnTransitionEnd(VTD_TREE_LEVELS.type)}
          >
            {pipelines.map(({ pipeline, sections }) => (
              <div
                className="root"
                key={pipeline}
                onClick={(e) => setLevelExpandedOnClick(e, pipeline, VTD_TREE_LEVELS.pipeline)}
              >
                <div className="content">
                  <h4>{pipeline}</h4>
                  <AngleDownSolid className={classNames({ rotate: levelsExpanded.pipeline === pipeline })} />
                </div>

                <div
                  className="details"
                  style={{ height: levelsExpanded.pipeline === pipeline ? levelsHeight.pipeline : 0 }}
                  onTransitionEnd={() => setLevelHeightOnTransitionEnd(VTD_TREE_LEVELS.pipeline)}
                >
                  {sections.map(({ section, years, umg }) => (
                    <div
                      className="root"
                      key={section}
                      onClick={(e) => setLevelExpandedOnClick(e, section, VTD_TREE_LEVELS.section)}
                    >
                      <div className="content">
                        <h4>
                          {section} ({umg})
                        </h4>
                        <AngleDownSolid className={classNames({ rotate: levelsExpanded.section === section })} />
                      </div>

                      <div
                        className="details"
                        style={{ height: levelsExpanded.section === section ? levelsHeight.section : 0 }}
                        onTransitionEnd={() => setLevelHeightOnTransitionEnd(VTD_TREE_LEVELS.section)}
                      >
                        {years.map(({ id, year }) => (
                          <div
                            className="root"
                            key={year}
                            onClick={(e) => setLevelExpandedOnClick(e, year, VTD_TREE_LEVELS.year)}
                          >
                            <div className="content">
                              <h4>{year}</h4>
                              <AngleDownSolid className={classNames({ rotate: levelsExpanded.year === year })} />
                            </div>

                            <div
                              className="details VtdForms"
                              style={{ height: levelsExpanded.year === year ? levelsHeight.year : 0 }}
                            >
                              <NavLink to={`${PAGES.vtdForm.path}/${id}`}>Форма</NavLink>
                              <NavLink to="/">Ремонты</NavLink>
                              <NavLink to="/">Обследования</NavLink>
                              <NavLink to="/">Статистика</NavLink>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VtdTree;
