import { memo } from 'react';
import classNames from 'classnames';
import { VTD_TREE_LEVELS } from 'redux/vtds/constants';

import { ReactComponent as AngleDownSolid } from '../../assets/svg/angleDownSolid.svg';
import './vtdTreeHeader.styles.scss';

type VtdTreeHeaderProps = {
  header: string;
  levelExpanded: VTD_TREE_LEVELS;
  useH3?: boolean;
  addInHeader?: string;
};

const VtdTreeHeader: React.FC<VtdTreeHeaderProps> = ({ header, levelExpanded, useH3, addInHeader = '' }) => {
  return (
    <div className="vtdTreeHeader">
      {useH3 ? <h3>{header + addInHeader}</h3> : <h4>{header + addInHeader}</h4>}
      <AngleDownSolid className={classNames({ rotate: levelExpanded === header })} />
    </div>
  );
};

export default memo(VtdTreeHeader);
