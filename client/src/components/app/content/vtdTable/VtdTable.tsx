import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { TABLE_TYPES, TABLE_TYPES_NAMES } from '../../../../redux/vtds/constants';
import { getPipelineTable } from '../../../../redux/vtds/thunks';
import { TableType } from '../../../../redux/vtds/types';
import LoadTable from '../../../commons/loadTable/LoadTable';
import PipelineTable from '../../../commons/pipelineTable/PipelineTable';
import { PAGES } from '../../constants';

import VtdForm from './vtdForm/VtdForm';

import './vtdTable.scss';

const VtdTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const { vtds } = useAppSelector((state) => state.vtds);

  const { [PAGES.vtdTable.params.vtdId]: vtdId, [PAGES.vtdTable.params.tableType]: tableTypeParam } = useParams();
  const tableType = tableTypeParam as TableType;

  const pipeline = useMemo(() => vtds.find(({ id }) => id === vtdId), [vtds, vtdId]);

  const vtdTable = pipeline?.pipelineData[tableType];

  useEffect(() => {
    if (vtdId && vtdTable === undefined) dispatch(getPipelineTable({ vtdId, tableType }));
  }, [dispatch, vtdTable, tableType, vtdId]);

  return (
    <div className="vtdTable">
      {pipeline && (
        <>
          <h1>
            {pipeline.pipeline} - {pipeline.section} ({pipeline.umg}) - {pipeline.year}
          </h1>

          <h2>{TABLE_TYPES_NAMES[tableType]}</h2>

          {vtdTable && vtdId ? (
            tableType === TABLE_TYPES.form ? (
              <VtdForm table={vtdTable} vtdId={vtdId} tableType={tableType} />
            ) : (
              <PipelineTable table={vtdTable} vtdId={vtdId} tableType={tableType} />
            )
          ) : (
            <LoadTable vtdId={vtdId!} tableType={tableType} />
          )}
        </>
      )}
    </div>
  );
};

export default VtdTable;
