import { FC, useRef, useState } from 'react';

import useVtdTreeStore from '../../../vtdTree/vtdTree.store';
import { getVtdIdBySelectValues } from '../../helpers/vtdGetters';
import VtdTreeSelect from '../vtdTreeSelect/vtdTreeSelect.component';
import FileInput from '../fileInput/fileInput.component';
import { SelectValues } from '../../../vtdManager/types/vtdTreeSelect';
import { FILE_INPUTS_KEYS } from '../../consts/addingInputs';
import ManageVtdButtons from '../manageVtdButtons/manageVtdButtons.component';
import DeletingTablesSelect from '../deletingTablesSelect/deletingTablesSelect.component';

import styles from './vtdManagerForm.module.scss';

const VtdManagerForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const vtdTree = useVtdTreeStore((state) => state.vtdTree);
  const [selectValues, setSelectValues] = useState<SelectValues>([]);

  const vtdId = getVtdIdBySelectValues(vtdTree, selectValues);

  return (
    <form className={styles.vtdManagerForm} ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <VtdTreeSelect selectValues={selectValues} setSelectValues={setSelectValues} />
      <DeletingTablesSelect />

      {FILE_INPUTS_KEYS.map((loadingFile) => (
        <FileInput
          key={loadingFile.name}
          title={loadingFile.name}
          inputName={loadingFile.name}
          isMultiple={'isMultiple' in loadingFile ? loadingFile.isMultiple : false}
        />
      ))}

      <ManageVtdButtons vtdId={vtdId} formRef={formRef} selectValues={selectValues} />
    </form>
  );
};

export default VtdManagerForm;
