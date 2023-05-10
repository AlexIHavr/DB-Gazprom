import { FC, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { PipelineTable, usePipelineTableStore, PAGES, getPipelineTable } from 'widgets';

import useVtdTableStore from './vtdTable.store';
import { TABLE_TYPES } from './consts/tableTypes';
import styles from './vtdTable.module.scss';
import { isValidTableType } from './helpers/isValidTableType';
import { vtdTableParse } from './helpers/vtdTableParser';
import useVtdTreeStore from './../vtdTree/vtdTree.store';

const VtdTable: FC = () => {
  const vtds = useVtdTreeStore((state) => state.vtds);
  const getVtdTable = useVtdTableStore((state) => state.getVtdTable);
  const [pipelineTables, addPipelineTable] = usePipelineTableStore((state) => [state.pipelineTables, state.addPipelineTable]);

  const { vtdId, type } = useParams<typeof PAGES.vtdTable.params>();
  const isValidType = vtdId && isValidTableType(type);

  const vtd = useMemo(() => vtds.find(({ id }) => id === vtdId), [vtds, vtdId]);
  const pipelineTable = isValidType && getPipelineTable({ pipelineTables, vtdId, type });

  const setPipelineTable = useCallback(async () => {
    if (vtd && isValidType && !pipelineTable) {
      const vtdTable = await getVtdTable({ vtdId, type });
      addPipelineTable({ vtdId, type, excelRows: vtdTableParse(vtdTable) });
    }
  }, [addPipelineTable, getVtdTable, isValidType, type, vtd, vtdId, pipelineTable]);

  useEffect(() => {
    setPipelineTable();
  }, [setPipelineTable]);

  return (
    <div className={styles.vtdTable}>
      {vtd && isValidType && (
        <>
          <h1>
            {vtd.pipeline} - {vtd.section} - {vtd.year}
          </h1>

          <h2>{TABLE_TYPES[type]}</h2>

          {pipelineTable && (pipelineTable.columns.length ? <PipelineTable table={pipelineTable} /> : <h3>Данных нет</h3>)}
        </>
      )}
    </div>
  );
};

export default VtdTable;
