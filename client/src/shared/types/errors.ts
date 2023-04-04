import { AxiosError } from 'axios';

export type ServerError = AxiosError<{ message: string }>;
