import { Module } from '@nestjs/common';
import { ReplayService } from './replay.service';
import { ReplayController } from './replay.controller';
import { PrismaService } from 'src/prisma.service';
import { CommentModule } from 'src/commen/comment.module';

@Module({
  controllers: [ReplayController],
  providers: [ReplayService, PrismaService],
  imports: [CommentModule]
})
export class ReplayModule { }
