import { ExpandMore } from '@mui/icons-material';
import { useCallback, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { PAGES } from '../../constants';
import { useAppSelector } from '../../../../hooks/redux';
import { getAdaptedVtdTree } from '../../../../helpers/vtdTree';

import { VTD_TREE_LEVELS } from './constants';
import { VtdTreeLevels } from './types';

import './vtdTree.scss';

const VtdTree: React.FC = () => {
  const { vtdTree } = useAppSelector((state) => state.vtdTree);
  const [expanded, setExpanded] = useState(VTD_TREE_LEVELS);

  const expandedOnChange = useCallback(
    (panel: string, level: VtdTreeLevels) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded({ ...expanded, [level]: isExpanded ? panel : false });
    },
    [expanded],
  );

  const adaptedVtdTree = useMemo(() => getAdaptedVtdTree(vtdTree), [vtdTree]);

  return (
    <div className="vtdTree">
      <h1>Дерево ВТД</h1>
      {adaptedVtdTree.map(({ type, pipelines }) => (
        <Accordion
          className="typeAccordion"
          key={type}
          expanded={expanded.type === type}
          onChange={expandedOnChange(type, VTD_TREE_LEVELS.type)}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h3>{type}</h3>
          </AccordionSummary>
          <AccordionDetails>
            {pipelines.map(({ pipeline, sections }) => (
              <Accordion
                key={pipeline}
                expanded={expanded.pipeline === pipeline}
                onChange={expandedOnChange(pipeline, VTD_TREE_LEVELS.pipeline)}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <h4>{pipeline}</h4>
                </AccordionSummary>
                <AccordionDetails>
                  {sections.map(({ section, years, umg }) => (
                    <Accordion
                      key={section}
                      expanded={expanded.section === section}
                      onChange={expandedOnChange(section, VTD_TREE_LEVELS.section)}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <h4>
                          {section} ({umg})
                        </h4>
                      </AccordionSummary>
                      <AccordionDetails>
                        {years.map(({ id, year }) => (
                          <Accordion
                            key={year}
                            expanded={expanded.year === year}
                            onChange={expandedOnChange(year, VTD_TREE_LEVELS.year)}
                          >
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              <h4>{year}</h4>
                            </AccordionSummary>
                            <AccordionDetails className="VtdForms">
                              <NavLink to={`${PAGES.vtdForm.path}/${id}`}>Форма</NavLink>
                              <NavLink to="/">Ремонты</NavLink>
                              <NavLink to="/">Обследования</NavLink>
                              <NavLink to="/">Статистика</NavLink>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default VtdTree;
