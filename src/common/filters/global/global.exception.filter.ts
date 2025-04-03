import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException)
      response.status(status).json({
        success: false,
        status: exception.getStatus(),
        message: exception.message,
      });
    else
      response.status(status).json({
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error!',
      });
  }
}
