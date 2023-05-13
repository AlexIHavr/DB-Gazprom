import { FC, memo } from 'react';

import { TemplateNameProps } from './props';
import styles from './templateName.module.scss';

const TemplateName: FC<TemplateNameProps> = () => {
  return <div className={styles.templateName}></div>;
};

export default memo(TemplateName);
