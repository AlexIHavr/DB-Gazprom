import { ChangeEvent, FC, memo, useRef } from 'react';
import globalStyles from 'shared/styles/global.module.scss';

import { SUPPORT_FORMATS_ACCEPT } from '../../../vtdTable/consts/supportFormats';
import { FileInputProps } from '../../types/props';

import styles from './fileInput.module.scss';

const FileInput: FC<FileInputProps> = ({ title, inputName, isMultiple }) => {
  const fileInputTextRef = useRef<HTMLInputElement>(null);

  const loadExcel = async (e: ChangeEvent<HTMLInputElement>) => {
    if (fileInputTextRef.current && e.target.files?.length) {
      fileInputTextRef.current.value = Array.from(e.target.files)
        .map(({ name }) => name)
        .join('; ');
    }
  };

  return (
    <div className={styles.fileInput}>
      <h2>{title}</h2>
      <label htmlFor={inputName}>
        <input ref={fileInputTextRef} className={styles.fileInputText} disabled />
        <input
          id={inputName}
          name={inputName}
          accept={SUPPORT_FORMATS_ACCEPT}
          type="file"
          onChange={loadExcel}
          multiple={isMultiple}
        />
        <span className={globalStyles.btn}>{`Выбрать файл${isMultiple ? 'ы' : ''}`}</span>
      </label>
    </div>
  );
};

export default memo(FileInput);
