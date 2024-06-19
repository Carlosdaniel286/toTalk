import { Body, Controller, Get, Param, Delete ,Req} from "@nestjs/common"
import { CommentsService } from "./comments.service"
import { TypeToken } from "src/common/logger-middleware/interface/interface.token"

@Controller()
export class CommentController {
  constructor(
    private readonly commentsService:CommentsService,
    
  
  ) {}
  @Get('comment/uniquePost/:id')
   async getUniqueComments(@Param('id') id: string){
    return await this.commentsService.getUniqueComments(id)
   }

   @Delete('comment/deleteComments/:id')
   async deleteComments(@Param('id') id: string,@Req()req:Request){
    console.log('oiiii')
    const authorId:TypeToken =req['user']
    return await this.commentsService.deletComments(Number(id),authorId.userId)
   }
}
