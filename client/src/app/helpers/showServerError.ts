import axios from 'axios';
import { useModalWindowsStore } from 'features';

import { ServerError } from '../types/serverError';

export const showServerError = (error: ServerError) => {
  const addModalWindow = useModalWindowsStore.getState().addModalWindow;

  if (axios.isAxiosError(error) && error.response?.data) {
    const errorData = error.response.data;

    let message = '';

    const errorResponse = errorData.errorResponse;
    if (errorResponse) {
      if (typeof errorResponse === 'string') message += errorResponse;
      else if (typeof errorResponse.message === 'object') message += errorResponse.message.join(';\n');
    }

    const dbValidationErrors = errorData.dbValidationErrors;
    if (dbValidationErrors) {
      message += dbValidationErrors.reduce((prev, value) => {
        prev += value.message + ';\n';
        return prev;
      }, '');
    } else if (!message) {
      message = errorData.message;
    }

    addModalWindow({ type: 'error', message });
  } else {
    addModalWindow({ type: 'error', message: error.message });
  }
};
