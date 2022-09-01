import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../../../hooks/redux';
import PipelineTable from '../../../commons/pipelineTable/PipelineTable';
import { PAGES } from '../../constants';

import './vtdForm.scss';

const VtdForm: React.FC = () => {
  const { vtdTree } = useAppSelector((state) => state.vtdTree);

  const { [PAGES.vtdForm.param]: vtdId } = useParams();

  const pipeline = useMemo(() => vtdTree.find(({ id }) => id === vtdId), [vtdTree, vtdId]);

  const vtdForm = pipeline?.pipelineData.form;

  return (
    <div className="vtdForm">
      <h1>{pipeline?.pipeline}</h1>
      {vtdForm && vtdId && <PipelineTable table={vtdForm} vtdId={vtdId} tableType="form" />}
    </div>
  );
};

export default VtdForm;
