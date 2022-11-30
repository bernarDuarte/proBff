//import { pinoOption } from './logger/studying-pino-log';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const GrpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'Livro',
        url: '0.0.0.0:4000',
        protoPath: join(__dirname, 'proto/livro.proto'),
      },
      bufferLogs: true,
    },
  );

  const fastifyAdapter = new FastifyAdapter({
    logger: true,
    maxParamLength: 1000,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  await app.listen(4001, '0.0.0.0');
  app.useLogger(app.get(Logger));

  await GrpcApp.listen();
}
bootstrap();
