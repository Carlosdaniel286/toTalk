//import { comments } from './../../../front/src/@types/comments';
import { Module } from '@nestjs/common';
import { ReplayService } from './replay.service';

import { PrismaService } from 'src/prisma.service';
import { CommentsModule } from 'src/comments/comments.module';
import { ReplayGateway } from './replay.gateway';
import { SelectFieldsService } from 'src/common/select-fields.service';
import { FormatData } from 'src/common/formatData/formatData';
import { ReplayController } from './replay.controller';
@Module({
  controllers: [ReplayController],
  providers: [ReplayGateway,ReplayService, PrismaService,SelectFieldsService,FormatData ],
  imports: [CommentsModule]
})
export class ReplayModule { }
