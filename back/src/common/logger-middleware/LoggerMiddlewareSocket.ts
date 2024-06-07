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
    const cookie = client.handshake.headers.cookie;
    const token = cookie.replace('token=','')
    const data = client.request
      //console.log(data)
    // Verifica se o token está presente na solicitação
    if (!token) {
      return false;
    }

    try {
      // Verifica se o token é válido e decodifica suas informações
      const decoded:TypeToken = this.jwtService.verify(token, jwtConstants);

      // Adiciona as informações do token ao objeto de contexto do socket
      client['user'] = decoded;
      console.log(client)
    client.request['user']
      return true; // Permitir acesso
    } catch (err) {
      // Trata erros específicos
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
