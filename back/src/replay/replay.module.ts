import { Module } from '@nestjs/common';
import { ReplayService } from './replay.service';
import { ReplayController } from './replay.controller';
import { PrismaService } from 'src/prisma.service';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  controllers: [ReplayController],
  providers: [ReplayService,PrismaService],
  imports:[CommentsModule]
})
export class ReplayModule {}
