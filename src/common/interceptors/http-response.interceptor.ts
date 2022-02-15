import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => {
      if (data == undefined) return data;
      else if (data.hasOwnProperty('data') || data.hasOwnProperty('message')) return data;
      else return { data: data };
      }),
    );
  }
}