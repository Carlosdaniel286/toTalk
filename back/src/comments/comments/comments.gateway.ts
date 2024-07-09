import { corsOptions } from './../../config/cors';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { SocketAuthGuard } from 'src/common/logger-middleware/LoggerMiddlewareSocket';
import { Comments } from '../interface/comments';
import { CommentsService } from '../comments.service';
import { TypeToken } from 'src/common/logger-middleware/interface/interface.token';
import { CommentQueryService } from '../comments.service.query';
import { CountLikes } from "../comments.service.countLikes"
@UseGuards(SocketAuthGuard)
@WebSocketGateway({cors:corsOptions})
export class CommentsGateway {
  constructor(
    private readonly commentsService:CommentsService,
    private readonly commentQueryService:CommentQueryService,
    private readonly countLikes:CountLikes
  ){}
  @WebSocketServer()
  server: Server;
  
@SubscribeMessage('comment')
 async handleComment(@MessageBody() createCommentDto: Comments, @ConnectedSocket() client: Socket) {
    console.log('Comentário recebido  comment :',  createCommentDto);
    const authorId:TypeToken =client['user']
    const commented = await this.commentsService.createComments(createCommentDto,authorId.userId)
    console.log(commented)
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
@SubscribeMessage('incrementLikeComments')
async addLike( @MessageBody() commentsId:number, @ConnectedSocket() client: Socket){
  const authorId:TypeToken =client['user']
  console.log('incrementLikeComments')
  console.log(commentsId)
  const postId =  await this.countLikes.incrementLikesComments(authorId.userId,commentsId)
   this.server.emit(`incrementLikeComments${postId}`,  commentsId);
  }
  @SubscribeMessage('decrementLikeComments')
  async deleteLike( @MessageBody() commentsId:number, @ConnectedSocket() client: Socket){
    const authorId:TypeToken =client['user']
    console.log('decrementLikeComments')
  console.log(commentsId)
  const postId = await this.countLikes.decrementLikeComments(authorId.userId,commentsId)
     this.server.emit(`decrementLikeComments${postId}`,  commentsId);
    }


}
