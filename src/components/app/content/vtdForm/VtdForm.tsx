import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { useAppSelector } from '../../../../hooks/redux';
import { PAGES } from '../../constants';

import './vtdForm.scss';

const VtdForm: React.FC = () => {
  const { vtdData } = useAppSelector((state) => state.vtdData);

  const { [PAGES.vtdForm.param]: id } = useParams();

  const columns: GridColDef[] = vtdData[id!].form[0].map((column) => ({
    field: String(column).replace(/\s/g, '_'),
    headerName: String(column),
    width: 150,
    headerAlign: 'center',
  }));

  const rows = vtdData[id!].form.slice(1).map((row) => {
    return row.reduce((rowObj: any, rowValue, i) => {
      rowObj.id = v4();
      rowObj[columns[i].field] = rowValue;
      return rowObj;
    }, {});
  });

  return (
    <div className="vtdForm">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[50, 100]}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
        }}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default VtdForm;
