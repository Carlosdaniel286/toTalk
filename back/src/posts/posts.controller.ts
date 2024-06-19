import { Body, Controller, Post,Get, Param ,Delete, Req} from '@nestjs/common';
import { Request } from 'express';
import { CreatePostDto } from './dto/create-post.dto/create-post.dto';
import { PostsService } from './posts.service';


@Controller()
export class PostsController {
  constructor(private readonly postsService:PostsService) {}
  @Post('/createPost')
  async createPost(@Body() createPostDto:CreatePostDto){
   return await this.postsService.createPostService(createPostDto)
}
    @Get('/post/uniquePost/:id')
   async getUniquePost(@Param('id') id: string){
    console.log(id)
    return await this.postsService.getUniquePost(id)

    }
    @Delete('/delete/post/:postId')
    async deletePost(@Param('postId') postId: number,@Req()req:Request){
      const authorId = req['user'] as number
    //  console.log(authorId,postId)
       return await this.postsService.deletePost(authorId,postId)
   
     }
}
