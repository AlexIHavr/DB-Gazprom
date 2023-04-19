import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

export const serverErrorWrapper = async <ReturnType>(func: () => ReturnType, status: HttpStatus = HttpStatus.BAD_REQUEST) => {
  try {
    return await func();
  } catch (error) {
    throw new HttpException(error, status);
  }
};
