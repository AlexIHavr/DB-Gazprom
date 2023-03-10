import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { TABLE_TYPES, TABLE_TYPES_KEYS } from 'redux/vtds/constants';
import { getPipelineTable } from 'redux/vtds/thunks';
import { TableType } from 'redux/vtds/types';
import LoadTable from 'components/commons/loadTable/LoadTable';
import PipelineTable from 'components/commons/pipelineTable/PipelineTable';
import { PAGES } from 'components/app/app.constants';

import VtdForm from './vtdForm/vtdForm.component';
import './vtdTable.styles.scss';

const VtdTable: React.FC = () => {
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
            {pipeline.pipeline} - {pipeline.section} ({pipeline.umg}) - {pipeline.year}
          </h1>

          <h2>{TABLE_TYPES[tableType].name}</h2>

          {vtdTable && vtdId ? (
            tableType === TABLE_TYPES.form.type ? (
              <VtdForm table={vtdTable} vtdId={vtdId} tableType={tableType} />
            ) : (
              <PipelineTable table={vtdTable} vtdId={vtdId} tableType={tableType} />
            )
          ) : (
            vtdTable === null && <LoadTable vtdId={vtdId!} tableType={tableType} />
          )}
        </>
      )}
    </div>
  );
};

export default VtdTable;
