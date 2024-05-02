import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(error: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.statusText || INTERNAL_SERVER_ERROR_MESSAGE;

    response
      .status(status)
      .json({
        statusCode: status,
        message,
      });
  }
}
