import { NextFunction, Request, Response } from 'express';

import ApiError from '../errors/ApiError';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const errorMiddleware = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
};

export default errorMiddleware;
