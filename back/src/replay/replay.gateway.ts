import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { urlClient } from 'src/@environment.variable';
import { UseGuards } from '@nestjs/common';
import { SocketAuthGuard } from 'src/common/logger-middleware/LoggerMiddlewareSocket';
import { Replay } from './interface/interface.replay';
import { TypeToken } from 'src/common/logger-middleware/interface/interface.token';
import { ReplayService } from './replay.service';
const corsOptions: CorsOptions = {
  origin:urlClient,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite esses métodos
  allowedHeaders: 'Content-Type, Accept', // Permite esses cabeçalhos
  credentials: true, 
};

@UseGuards(SocketAuthGuard)
@WebSocketGateway({cors:corsOptions})
export class ReplayGateway {
  constructor(private readonly ReplayService:ReplayService){}
  @WebSocketServer()
  server: Server;
  
@SubscribeMessage('replay')
 async handleReplay(@MessageBody() createReplay: Replay, @ConnectedSocket() client: Socket) {
    console.log('Comentário recebido:',  createReplay);
    console.log('ID do cliente:', client['user']);
    const authorId:TypeToken =client['user']
    const replay = await this.ReplayService.createReaplyService(createReplay,authorId.userId)
    
    this.server.emit('replay',  replay);
  }

  @SubscribeMessage('getcomment')
  async getReplay(@MessageBody() createCommentDto:{commentsId:number}, @ConnectedSocket() client: Socket) {
    console.log('Comentário recebido:',  createCommentDto);
    
    // this.server.emit('getcomment',  commented);
  }
}
