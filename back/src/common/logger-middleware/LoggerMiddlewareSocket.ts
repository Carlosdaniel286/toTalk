import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { jwtConstants } from 'src/@environment.variable';
import { Socket } from 'socket.io';
import { TypeToken } from './interface/interface.token';

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    

    try {
      const cookie= client.handshake.headers.cookie;
      const token = cookie.replace('token=','')
      const decoded:TypeToken = this.jwtService.verify(token, jwtConstants);
      client['user'] = decoded;
      return true; // Permitir acesso
    } catch (err) {
     
      if (err instanceof TokenExpiredError) {
        client.emit('erro', err);
      } else if (err instanceof Error) {
       client.emit('erro', err);
      } else {
        console.error('An unexpected error occurred:', err);
        client.emit('erro', 'An unexpected error occurred');
      }

      return false; // Negar acesso
    }
  }
}
