import { CommentQueryService } from './comments.service.query';
import { CountComments } from './comments.service.countComments.ts';
import { Module } from '@nestjs/common';
import { CommentsGateway } from './comments/comments.gateway';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from 'src/posts/dto/create-post.dto/create-post.dto';
import { FormatData } from 'src/common/formatData/formatData';
import { CommentController } from './comments.controller';
import { SelectFieldsService } from 'src/common/select-fields.service';
import { CountLikes } from './comments.service.countLikes';

@Module({
  providers: [
    CommentsGateway,
    CommentsService,
    PrismaService,
    CreatePostDto,
    FormatData,
    SelectFieldsService,
    CountComments,
    CountLikes,
    CommentQueryService
  ],
  controllers:[CommentController]
})
export class CommentsModule {}
