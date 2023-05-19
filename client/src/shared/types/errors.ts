import { AxiosError } from 'axios';

export type ServerError = AxiosError<{
  name: string;
  message: string;
  status: number;
  path: string;
  timestamp: string;
  errorResponse: string | { error: string; message: string[]; statusCode: number } | false;
  dbValidationErrors: { message: string }[] | false;
}>;
