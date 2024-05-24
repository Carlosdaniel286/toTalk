import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostsModule } from 'src/posts/posts.module';
import { CreatePostDto } from 'src/posts/dto/create-post.dto/create-post.dto';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService,PrismaService,CreatePostDto],
  imports:[PostsModule]
})
export class CommentsModule {}
