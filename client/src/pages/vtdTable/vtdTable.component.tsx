import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PipelineTable, usePipelineTableStore, PAGES, getPipelineTable } from 'widgets';

import useVtdTableStore from './vtdTable.store';
import LoadTableButton from './components/loadTableButton/loadTableButton.component';
import { TABLE_TYPES } from './consts/tableTypes';
import styles from './vtdTable.module.scss';
import { isValidTableType } from './helpers/isValidTableType';

const VtdTable: FC = () => {
  const vtds = useVtdTableStore((state) => state.vtds);
  const [pipelineTables, addPipelineTable] = usePipelineTableStore((state) => [state.pipelineTables, state.addPipelineTable]);

  const { vtdId, type } = useParams<typeof PAGES.vtdTable.params>();
  const isValidType = vtdId && isValidTableType(type);

  const vtd = useMemo(() => vtds.find(({ id }) => id === vtdId), [vtds, vtdId]);
  const vtdTable = isValidType && getPipelineTable({ pipelineTables, vtdId, type });

  useEffect(() => {
    if (isValidType && !vtdTable) addPipelineTable({ vtdId, type });
  }, [addPipelineTable, isValidType, type, vtdId, vtdTable]);

  return (
    <div className={styles.vtdTable}>
      {vtd && isValidType && (
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
