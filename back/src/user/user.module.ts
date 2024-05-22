import { Module } from '@nestjs/common';
import { CreateUserService } from './user.Service';
import { CreateUserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [CreateUserService,PrismaService],
})
export class CreateUserModule {}