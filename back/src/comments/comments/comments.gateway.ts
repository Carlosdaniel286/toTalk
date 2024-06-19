import { corsOptions } from './../../config/cors';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { SocketAuthGuard } from 'src/common/logger-middleware/LoggerMiddlewareSocket';
import { Comments } from '../interface/comments';
import { CommentsService } from '../comments.service';
import { TypeToken } from 'src/common/logger-middleware/interface/interface.token';
import { CommentQueryService } from '../comments.service.query';

@UseGuards(SocketAuthGuard)
@WebSocketGateway({cors:corsOptions})
export class CommentsGateway {
  constructor(
    private readonly commentsService:CommentsService,
    private readonly commentQueryService:CommentQueryService
  ){}
  @WebSocketServer()
  server: Server;
  
@SubscribeMessage('comment')
 async handleComment(@MessageBody() createCommentDto: Comments, @ConnectedSocket() client: Socket) {
    console.log('Comentário recebido  comment :',  createCommentDto);
    const authorId:TypeToken =client['user']
    const commented = await this.commentsService.createComments(createCommentDto,authorId.userId)
    this.server.emit('comment',  commented);
  }

  @SubscribeMessage('getcomment')
  async getComment(@MessageBody() createCommentDto:{postId:number}, @ConnectedSocket() client: Socket) {
    //console.log('Comentário recebido:',  createCommentDto);
    const authorId:TypeToken =client['user']
     const commented = await this.commentQueryService.getAllComments(createCommentDto.postId,authorId.userId)
     this.server.emit('getcomment',  commented);
  }
  @SubscribeMessage('getResponseComments')
  async getReplayComments(@MessageBody() createCommentDto:{parentId:number}, @ConnectedSocket() client: Socket) {
    console.log('Comentário recebido:',  createCommentDto);
    const authorId:TypeToken =client['user']
    const commented = await this.commentQueryService.getAllCommentsOfReponse(createCommentDto.parentId,authorId.userId)
    this.server.emit('getResponseComments',  commented);
}



}
