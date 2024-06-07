import { Module } from '@nestjs/common';
import { CommentsGateway } from './comments/comments.gateway';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from 'src/posts/dto/create-post.dto/create-post.dto';
import { FormatData } from 'src/common/formatData/formatData';

@Module({
  providers: [CommentsGateway,CommentsService,PrismaService,CreatePostDto,FormatData]
})
export class CommentsModule {}
