import { createDb } from './config/sequelize';
import { Module, Scope } from '@nestjs/common';
import { LivroController } from './produtos/livro.controller';
import { LoggerModule } from 'nestjs-pino';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LivroModule } from './produtos/livro.module';
import { SaksLoggingModule } from '@SaksLog/saks-logging/saks-logging.module';
import { LoggingInterceptor } from '@SaksLog/saks-logging/logging.interceptor';
import { loggerOptions } from '@SaksLog/saks-logging/index';

@Module({
  imports: [
    SaksLoggingModule,
    LivroModule,
    LoggerModule.forRoot(loggerOptions),
  ],
  controllers: [LivroController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    ...createDb,
  ],
})
export class AppModule {}
