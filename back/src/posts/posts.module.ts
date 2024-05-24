import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto/create-post.dto';
@Module({
  providers: [PostsService,PrismaService],
  controllers: [PostsController],
 
  
})
export class PostsModule {}
