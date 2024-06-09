import { Body, Controller, Get, Param, Post } from "@nestjs/common"
//import { ReplayService } from "./replay.service"
import { CommentsService } from "./comments.service"

@Controller()
export class CommentController {
  constructor(private readonly commentsService:CommentsService) {}
  @Get('comment/uniquePost/:id')
   async getUniqueComments(@Param('id') id: string){
    return await this.commentsService.getUniqueComments(id)
   }
}
