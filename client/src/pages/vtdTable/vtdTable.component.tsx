import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PipelineTable } from 'widgets';
import { PAGES } from 'shared';
import { TABLE_TYPES, TABLE_TYPES_KEYS } from 'redux/vtds/constants';
import { TableType } from 'redux/vtds/types';

import useVtdTableStore from './vtdTable.store';
import LoadTableButton from './components/loadTableButton/loadTableButton.component';

import './vtdTable.styles.scss';

const VtdTable: FC = () => {
  const [vtds, setPipelineTable] = useVtdTableStore((state) => [state.vtds, state.setPipelineTable]);

  const { vtdId, tableType: tableTypeParam } = useParams<typeof PAGES.vtdTable.params>();

  const pipeline = useMemo(() => vtds.find(({ id }) => id === vtdId), [vtds, vtdId]);
  const tableType = tableTypeParam as TableType;
  const vtdTable = pipeline?.pipelineData[tableType];

  const isValidTableType = useMemo(() => TABLE_TYPES_KEYS.includes(tableType), [tableType]);

  useEffect(() => {
    if (vtdId && isValidTableType && vtdTable === undefined) setPipelineTable({ vtdId, tableType });
  }, [setPipelineTable, vtdTable, tableType, vtdId, isValidTableType]);

  return (
    <div className="vtdTable">
      {pipeline && isValidTableType && (
        <>
          <h1>
            {pipeline.pipeline} - {pipeline.section} - {pipeline.year}
          </h1>

          <h2>{TABLE_TYPES[tableType].name}</h2>

          {vtdTable && vtdId ? (
            <PipelineTable table={vtdTable} vtdId={vtdId} tableType={tableType} />
          ) : (
            vtdTable === null && <LoadTableButton vtdId={vtdId!} tableType={tableType} />
          )}
        </>
      )}
    </div>
  );
};

export default VtdTable;
