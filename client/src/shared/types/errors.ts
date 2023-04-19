import { AxiosError } from 'axios';

export type ServerError = AxiosError<{ error: string; statusCode: number; message: string }>;
