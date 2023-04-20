import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'sequelize';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = exception instanceof HttpException && exception.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const dbValidationErrors = exception instanceof ValidationError && exception.errors;
    const { message, name } = exception;

    console.log(exception);

    response.status(status).json({
      name,
      message,
      status,
      path: request.url,
      dbValidationErrors,
      errorResponse,
      timestamp: new Date().toLocaleString(),
    });
  }
}
