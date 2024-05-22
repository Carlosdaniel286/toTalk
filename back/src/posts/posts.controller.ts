import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto/create-post.dto';
import { PostsService } from './posts.service';


@Controller()
export class PostsController {
  constructor(private readonly postsService:PostsService) {}
  @Post('/post')
  async createPost(@Body() createPostDto:CreatePostDto){
   return await this.postsService.createPostService(createPostDto)

    }
}
