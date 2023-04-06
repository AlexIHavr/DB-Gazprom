import { FC, memo } from 'react';
import classNames from 'classnames';

import { ReactComponent as AngleDownSolid } from '../../assets/svg/angleDownSolid.svg';
import { VtdTreeHeaderProps } from '../../types/props';

import styles from './vtdTreeHeader.module.scss';

const VtdTreeHeader: FC<VtdTreeHeaderProps> = ({ header, levelExpanded, useH3 }) => {
  return (
    <div className={styles.vtdTreeHeader}>
      {useH3 ? <h3>{header}</h3> : <h4>{header}</h4>}
      <AngleDownSolid className={classNames({ [styles.rotate]: levelExpanded === header })} />
    </div>
  );
};

export default memo(VtdTreeHeader);
