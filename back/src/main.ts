
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { urlClient } from './@environment.variable';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin:urlClient,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite esses métodos
    allowedHeaders: 'Content-Type, Accept', // Permite esses cabeçalhos
    credentials: true, 
  };
  app.enableCors(corsOptions);
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
