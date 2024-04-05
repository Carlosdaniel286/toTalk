import { Module } from '@nestjs/common';
import { userController } from '../controller/user/app.controller';
import { UserService } from '../providers/user/app.service';
import { PrismaService } from 'src/database/prisma';
@Module({
  imports: [],
  controllers: [userController],
  providers: [UserService,PrismaService],
})
export class AppModule {}
