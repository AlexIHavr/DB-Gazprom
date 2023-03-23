import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { PipelineTable } from 'widgets';
import { LoadTableButton, PAGES } from 'shared';
import { TABLE_TYPES, TABLE_TYPES_KEYS } from 'redux/vtds/constants';
import { getPipelineTable } from 'redux/vtds/thunks';
import { TableType } from 'redux/vtds/types';

import './vtdTable.styles.scss';

const VtdTable: FC = () => {
  const dispatch = useAppDispatch();
  const { vtds } = useAppSelector((state) => state.vtds);

  const { vtdId, tableType: tableTypeParam } = useParams<typeof PAGES.vtdTable.params>();

  const pipeline = useMemo(() => vtds.find(({ id }) => id === vtdId), [vtds, vtdId]);
  const tableType = tableTypeParam as TableType;
  const vtdTable = pipeline?.pipelineData[tableType];

  useEffect(() => {
    if (vtdId && vtdTable === undefined) dispatch(getPipelineTable({ vtdId, tableType }));
  }, [dispatch, vtdTable, tableType, vtdId]);

  return (
    <div className="vtdTable">
      {pipeline && TABLE_TYPES_KEYS.includes(tableType) && (
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
