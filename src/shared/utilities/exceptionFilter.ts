import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { log } from 'console';
import { Request, Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    if (exception instanceof BadRequestException) {
      exception = exception.getResponse() as any;
      message = exception.message;
      status = HttpStatus.BAD_REQUEST;
    }
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    // You can customize the error response further here
    const errorResponse = {
      code: status,
      status: false,
      message,
      error: exception.name, // Include the name of the exception class
    };

    response.status(status).json(errorResponse);
  }
}
