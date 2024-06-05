import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
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
export class CommentsModule {}
