import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  vtdTree: [
    {
      type: 'Магистральные газопроводы',
      pipelines: [
        {
          pipeline: 'МГ Торжок-Минск-Ивацевичи III',
          sections: [
            {
              section: '390-424',
              umg: 'Оршанское',
              years: [
                {
                  id: '1',
                  year: '2018',
                },
                {
                  id: '2',
                  year: '2006',
                },
                {
                  id: '3',
                  year: '2003',
                },
              ],
            },
            {
              section: '425,9-529',
              umg: 'Оршанское-Крупское',
              years: [
                {
                  id: '4',
                  year: '2020',
                },
                {
                  id: '5',
                  year: '2015',
                },
                {
                  id: '6',
                  year: '2006',
                },
              ],
            },
          ],
        },
        {
          pipeline: 'МГ Торжок-Минск-Ивацевичи II',
          sections: [
            {
              section: '390-424',
              umg: 'Оршанское',
              years: [
                {
                  id: '7',
                  year: '2018',
                },
                {
                  id: '8',
                  year: '2006',
                },
                {
                  id: '9',
                  year: '2003',
                },
              ],
            },
            {
              section: '425,9-529',
              umg: 'Оршанское-Крупское',
              years: [
                {
                  id: '10',
                  year: '2020',
                },
                {
                  id: '11',
                  year: '2015',
                },
                {
                  id: '12',
                  year: '2006',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'Газопроводы-отводы',
      pipelines: [
        {
          pipeline: 'газопровод-отвод Минск-Гомель',
          sections: [
            {
              section: '1,5-65',
              umg: 'Минское-Осиповичское',
              years: [
                {
                  id: '13',
                  year: '2016',
                },
                {
                  id: '14',
                  year: '2002',
                },
              ],
            },
            {
              section: '65,01-190,24',
              umg: 'Осиповичское',
              years: [
                {
                  id: '15',
                  year: '2016',
                },
                {
                  id: '16',
                  year: '2002',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const vtdTreeSlice = createSlice({
  name: 'vtdTree',
  initialState,
  reducers: {},
});

const vtdTreeReducer = vtdTreeSlice.reducer;
export default vtdTreeReducer;
