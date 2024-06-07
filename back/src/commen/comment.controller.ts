import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';


@Controller()
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/comments')
 async create(@Body() createCommentDto: CreateCommentDto) {
  
    return  await this.commentsService.createComments(createCommentDto);
  }

 
}
