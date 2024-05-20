import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserController } from './userCases/CreateUser/createUser.controller';
import { CreateUserService } from './userCases/CreateUser/createUser.Service';
import {  PrismaService } from './prisma.service';
@Module({
  imports: [],
  controllers: [AppController,CreateUserController],
  providers: [AppService,CreateUserService,PrismaService],
})
export class AppModule {}
