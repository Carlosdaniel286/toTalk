import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { urlClient } from 'src/@environment.variable';
import { UseGuards } from '@nestjs/common';
import { SocketAuthGuard } from 'src/common/logger-middleware/LoggerMiddlewareSocket';
import { Comments } from '../interface/comments';
import { CommentsService } from '../comments.service';
import { TypeToken } from 'src/common/logger-middleware/interface/interface.token';
const corsOptions: CorsOptions = {
  origin:urlClient,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite esses métodos
  allowedHeaders: 'Content-Type, Accept', // Permite esses cabeçalhos
  credentials: true, 
};

@UseGuards(SocketAuthGuard)
@WebSocketGateway({cors:corsOptions})
export class CommentsGateway {
  constructor(private readonly commentsService:CommentsService){}
  @WebSocketServer()
  server: Server;
  
@SubscribeMessage('comment')
 async handleComment(@MessageBody() createCommentDto: Comments, @ConnectedSocket() client: Socket) {
    console.log('Comentário recebido:',  createCommentDto);
    console.log('ID do cliente:', client['user']);
   const authorId:TypeToken =client['user']
   
    const commented = await this.commentsService.createComments(createCommentDto,authorId.userId)
    // Emitir o comentário para todos os clientes conectados
    this.server.emit('comment',  commented);
  }

  @SubscribeMessage('getcomment')
  async getComment(@MessageBody() createCommentDto:{postId:number}, @ConnectedSocket() client: Socket) {
    //console.log('Comentário recebido:',  createCommentDto);
    const user = client['user'] as number
     const commented = await this.commentsService.getAllComments(createCommentDto.postId,user)
     this.server.emit('getcomment',  commented);
  }
}
