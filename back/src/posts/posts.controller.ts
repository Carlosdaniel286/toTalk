import { Body, Controller, Post,Get, Param } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto/create-post.dto';
import { PostsService } from './posts.service';


@Controller()
export class PostsController {
  constructor(private readonly postsService:PostsService) {}
  @Post('/createPost')
  async createPost(@Body() createPostDto:CreatePostDto){
   return await this.postsService.createPostService(createPostDto)
}
    @Get('post/uniquePost/:id')
   async getUniquePost(@Param('id') id: string){
    return await this.postsService.getUniquePost(id)

    }
}
