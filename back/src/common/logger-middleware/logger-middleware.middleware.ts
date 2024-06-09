import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { jwtConstants } from 'src/@environment.variable';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { TypeToken } from './interface/interface.token';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    try {
      
      const token:string| undefined = req.cookies['token'];
      console.log(token)
      const dtoBody = req.body;
     console.log(token)
      // Verifica se o token está presente na solicitação
      if (!token) {
        throw new Error('Token not provided');
      }

      // Verifica se o token é válido e decodifica suas informações
      const decoded: TypeToken = this.jwtService.verify(token, jwtConstants);

      // Verifica se a propriedade 'authorId' já existe no corpo da solicitação
      if ('authorId' in dtoBody) {
        throw new Error('The "authorId" property already exists in the request body');
      }

      // Adiciona a propriedade 'authorId' com base nas informações do token decodificado
      const newBody = { ...dtoBody, authorId: decoded.userId };
      req.body = newBody;

      
      
      next();
    } catch (err) {
      // Trata erros específicos
      if (err instanceof TokenExpiredError) {
        return res.status(400).send(err.message);
      }
      if (err instanceof Error) {
        return res.status(400).send(err.message);
      }
      // Registra o erro e retorna uma resposta de erro genérica
      console.error('An unexpected error occurred:', err);
      return res.status(500).send('An unexpected error occurred');
    }
  }
}
