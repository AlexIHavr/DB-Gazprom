import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getPipelineTable } from '../../../../redux/vtdTree/thunks';
import PipelineTable from '../../../commons/pipelineTable/PipelineTable';
import { PAGES } from '../../constants';

import './vtdForm.scss';

const VtdForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vtdTree } = useAppSelector((state) => state.vtdTree);

  const { [PAGES.vtdForm.param]: vtdId } = useParams();

  const pipeline = useMemo(() => vtdTree.find(({ id }) => id === vtdId), [vtdTree, vtdId]);

  const vtdForm = pipeline?.pipelineData.form;

  useEffect(() => {
    if (vtdId && !pipeline?.pipelineData.form) dispatch(getPipelineTable({ vtdId, tableType: 'form' }));
  }, [dispatch, pipeline?.pipelineData.form, vtdId]);

  return (
    <div className="vtdForm">
      <h1>{pipeline?.pipeline}</h1>
      {vtdForm && vtdId && <PipelineTable table={vtdForm} vtdId={vtdId} tableType="form" />}
    </div>
  );
};

export default VtdForm;
