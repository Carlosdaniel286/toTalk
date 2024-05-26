
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { urlClient } from './@environment.variable';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:urlClient,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite esses métodos
    allowedHeaders: 'Content-Type, Accept', // Permite esses cabeçalhos
    credentials: true, // Permite o envi
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe(
      {
         transform: true,
         whitelist:true,
         forbidNonWhitelisted:true
        
      }
  ));
  await app.listen(3001);
}
bootstrap();
