import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PipelineTable, usePipelineTableStore } from 'widgets';
import { PAGES } from 'shared/consts/pages';

import useVtdTableStore from './vtdTable.store';
import LoadTableButton from './components/loadTableButton/loadTableButton.component';
import { TABLE_TYPES, TABLE_TYPES_KEYS } from './consts/tableTypes';
import { TableType } from './types/pipelineTable';

import './vtdTable.styles.scss';

const VtdTable: FC = () => {
  const vtds = useVtdTableStore((state) => state.vtds);
  const [pipelineTables, addPipelineTable] = usePipelineTableStore((state) => [state.pipelineTables, state.addPipelineTable]);

  const { vtdId, tableType } = useParams<typeof PAGES.vtdTable.params>();

  const vtd = useMemo(() => vtds.find(({ id }) => id === vtdId), [vtds, vtdId]);
  const type = tableType as TableType;
  const vtdTable = pipelineTables.find((pipelineTable) => pipelineTable.vtdId === vtdId && pipelineTable.type === type);

  const isValidTableType = useMemo(() => TABLE_TYPES_KEYS.includes(type), [type]);

  useEffect(() => {
    if (vtdId && isValidTableType && !vtdTable) addPipelineTable({ vtdId, type });
  }, [addPipelineTable, vtdTable, vtdId, isValidTableType, type]);

  return (
    <div className="vtdTable">
      {vtd && isValidTableType && vtdId && (
        <>
          <h1>
            {vtd.pipeline} - {vtd.section} - {vtd.year}
          </h1>

          <h2>{TABLE_TYPES[type].name}</h2>

          {vtdTable ? <PipelineTable table={vtdTable} /> : <LoadTableButton vtdId={vtdId} type={type} />}
        </>
      )}
    </div>
  );
};

export default VtdTable;
