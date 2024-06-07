import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentsController } from './comment.controller';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostsModule } from 'src/posts/posts.module';
import { CreatePostDto } from 'src/posts/dto/create-post.dto/create-post.dto';
import { FormatData } from 'src/common/formatData/formatData';
@Module({
  controllers: [CommentsController],
  providers: [CommentsService,PrismaService,CreatePostDto,FormatData],
  imports:[PostsModule]
})
export class CommentModule {}
