import { CommentQueryService } from './comments.service.query';
import { Count } from './comments.service.likes';
import { Module } from '@nestjs/common';
import { CommentsGateway } from './comments/comments.gateway';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from 'src/posts/dto/create-post.dto/create-post.dto';
import { FormatData } from 'src/common/formatData/formatData';
import { CommentController } from './comments.controller';
import { SelectFieldsService } from 'src/common/select-fields.service';


@Module({
  providers: [
    CommentsGateway,
    CommentsService,
    PrismaService,
    CreatePostDto,
    FormatData,
    SelectFieldsService,
    Count,
    CommentQueryService
  ],
  controllers:[CommentController]
})
export class CommentsModule {}
