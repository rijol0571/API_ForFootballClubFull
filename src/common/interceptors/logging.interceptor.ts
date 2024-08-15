import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common';
  import { Observable } from 'rxjs'; // Import Observable from rxjs
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);
  
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
      const now = Date.now();
      return next.handle().pipe(
        tap(() => this.logger.log(`Request... ${Date.now() - now}ms`)),
      );
    }
  }
  


//   RxJS: Vazifalari:
//   Asinxron oqimlarni boshqarish: Ma'lumotlar oqimlarini va asinxron operatsiyalarni
//    boshqarishga yordam beradi.
//   Observables: Ma'lumotlar oqimlarini kuzatish va ularga reaktsiya qilish imkoniyatini beradi.
//   Operators: Ma'lumotlar oqimlarini transformatsiya qilish, filtrlash va birlashtirish uchun
//    funksiyalarni taqdim etadi.
  