import classNames from 'classnames';
import { memo, useMemo, useState } from 'react';
import { InnerCellTables } from 'redux/vtds/types';

import PipelineTable from '../PipelineTable';
import './innerTables.scss';

type InnerTablesProps = {
  innerTablesData: InnerCellTables;
};

const InnerTables: React.FC<InnerTablesProps> = ({ innerTablesData }) => {
  const innerTablesDataEntries = useMemo(() => Object.entries(innerTablesData), [innerTablesData]);

  const [activeYear, setActiveYear] = useState(innerTablesDataEntries[0][0]);

  return (
    <div className="innerTables">
      <div className="innerTablesYears">
        {innerTablesDataEntries.map(([year]) => (
          <button className={classNames('apply', { active: year === activeYear })} key={year} onClick={() => setActiveYear(year)}>
            {year}
          </button>
        ))}
      </div>
      <div>
        <PipelineTable table={innerTablesData[activeYear]} width={800} height={300} />
      </div>
    </div>
  );
};

export default memo(InnerTables);
