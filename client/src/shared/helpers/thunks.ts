import { AxiosError } from 'axios';

export const requestWithReject = async <ReturnValue extends object, ResponseErrorData extends object>(
  requestFunc: () => ReturnValue,
) => {
  try {
    return await requestFunc();
  } catch (err) {
    const error = err as AxiosError<ResponseErrorData>;

    if (!error.response?.data) throw err;

    return error.response.data;
  }
};
