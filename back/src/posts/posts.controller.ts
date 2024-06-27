import { Body, Controller, Post,Get, Param ,Delete, Req,Put} from '@nestjs/common';
import { Request } from 'express';
import { CreatePostDto } from './dto/create-post.dto/create-post.dto';
import { PostsService } from './posts.service';
import { UpdatePost } from './dto/create-post.dto/edite-post.dto';
import { TypeToken } from 'src/common/logger-middleware/interface/interface.token';


@Controller()
export class PostsController {
  constructor(private readonly postsService:PostsService) {}
  @Post('/createPost')
  async createPost(@Body() createPostDto:CreatePostDto){
   return await this.postsService.createPostService(createPostDto)
}
    @Get('/post/uniquePost/:id')
   async getUniquePost(@Param('id') id: string,@Req()req:Request){
    const authorId = req['user'] as number
    console.log(id)
    return await this.postsService.getUniquePost(id,authorId)

    }
    @Delete('/delete/post/:postId')
    async deletePost(@Param('postId') postId: number,@Req()req:Request){
      const authorId = req['user'] as number
    //  console.log(authorId,postId)
       return await this.postsService.deletePost(authorId,postId)
   
     }

     @Put('/edite/post/:postId')
     async editPost(@Body() updatePost: UpdatePost,  @Param('postId') postId:number){
         return await this.postsService.editPost(updatePost,postId)
       }
}
