import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { PrismaService } from 'src/prisma.service';
import { FormatData } from 'src/common/formatData/formatData';

@Module({
  controllers: [FeedController],
  providers: [FeedService,PrismaService,FormatData],
})
export class FeedModule {}
