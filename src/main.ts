import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { AllExceptionsFilter } from './helpers/filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllExceptionsFilter());
  const config = new DocumentBuilder()
    .setTitle('Leocode recruitment task')
    .setDescription('API for recruitment task')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000, () => {
    Logger.log('App is listening on port 3000');
  });
}
bootstrap();
