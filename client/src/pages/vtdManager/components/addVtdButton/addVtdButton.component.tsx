import { FC, memo } from 'react';
import globalStyles from 'shared/styles/global.module.scss';

import useVtdTreeStore from '../../../vtdTree/vtdTree.store';
import { ManageVtdButtonsProps } from '../../../vtdManager/types/props';
import { getStartKm, getVtdTreeChildren } from '../../helpers/vtdGetters';
import { createForm, createJoining, createReport, createVtd } from '../../../vtdManager/helpers/serviceManager';
import { FILE_INPUTS } from '../../consts/addingInputs';
import { VTD_TREE_LEVELS_KEYS } from '../../../vtdTree/consts/vtdTreeLevels';

const AddVtdButton: FC<ManageVtdButtonsProps> = ({ vtdId, formRef, selectValues }) => {
  const [vtds, vtdTree] = useVtdTreeStore((state) => [state.vtds, state.vtdTree]);

  const addVtdOnClick = async () => {
    const vtd = vtds.find(({ id }) => id === vtdId);
    let startKm = vtd ? getStartKm(vtd) : null;

    const formData = new FormData(formRef.current!);

    if (!vtdId) {
      const vtd = await createVtd(formData);

      vtdId = vtd.id;
      startKm = getStartKm(vtd);
    }

    if (startKm && vtdId) {
      const reportFiles = (formData.getAll(FILE_INPUTS.report.name) as File[]).filter(({ name }) => name !== '');
      const joiningFile = formData.get(FILE_INPUTS.joining.name) as File;

      await createReport(vtdId, reportFiles);

      if (joiningFile.name !== '') {
        const prevLevelVtdTree = getVtdTreeChildren({ vtdTree, selectValues, selectIndex: VTD_TREE_LEVELS_KEYS.length - 1 });
        const prevLevelVtdTreeIndex = prevLevelVtdTree.findIndex(({ header }) => header === selectValues.at(-1));
        const vtdIdPrev = prevLevelVtdTree[prevLevelVtdTreeIndex + 1]?.id;

        await createJoining({ vtdId, file: joiningFile, vtdIdPrev });
      }

      await createForm({ vtdId, startKm });
    }
  };

  return (
    <button className={globalStyles.btn} onClick={addVtdOnClick}>
      Добавить ВТД
    </button>
  );
};

export default memo(AddVtdButton);
