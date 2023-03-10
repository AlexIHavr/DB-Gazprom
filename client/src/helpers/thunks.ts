import { AxiosError } from 'axios';

export const requestWithReject = async <ReturnValue extends object, RejectValue extends object, RejectReturnValue>(
  requestFunc: () => ReturnValue,
  rejectWithValue: (value: RejectValue) => RejectReturnValue,
) => {
  try {
    return await requestFunc();
  } catch (err) {
    const error = err as AxiosError<RejectValue>;

    if (!error.response?.data) throw err;

    return rejectWithValue(error.response.data);
  }
};
