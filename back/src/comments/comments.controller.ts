import { Body, Controller, Get, Param, Delete ,Req, Put} from "@nestjs/common"
import { CommentsService } from "./comments.service"
import { TypeToken } from "src/common/logger-middleware/interface/interface.token"
import { CommentsUpdateDto } from "./dto/edit.comments.dto"
@Controller()
export class CommentController {
  constructor(
    private readonly commentsService:CommentsService,
    
  
  ) {}
  @Get('comment/uniquePost/:id')
   async getUniqueComments(@Param('id') id: string,@Req()req:Request){
    const authorId = req['user'] as number

    return await this.commentsService.getUniqueComments(id,authorId)
   }

   @Delete('comment/deleteComments/:id')
   async deleteComments(@Param('id') id: string,@Req()req:Request){
     const authorId = req['user'] as number
    return await this.commentsService.deletComments(Number(id),authorId)
   }
   @Put('/edite/comments/:commentsId')
   async editPost(@Body() commentsUpdateDto: CommentsUpdateDto,  @Param('commentsId') commentsId:number){
       return await this.commentsService.editComments(commentsUpdateDto,commentsId)
     }
}
