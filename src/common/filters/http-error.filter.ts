import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import * as Sentry from "@sentry/node";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let error: {}, status: number = 500;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();
      if (res.statusCode) {
        error = {
          status: res.statusCode,
          message: res.message || res.error
        };
      } else {
        error = res;
      }
    } else {
      Sentry.captureException(exception);
      console.log(exception)
      error = {
        status: 500,
        message: 'Ocurrió un problema'
      };
    }
    response.status(status).json(error);
  }
}