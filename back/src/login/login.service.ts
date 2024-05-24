import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class UserServiceLogin {
  constructor(private prisma: PrismaService, private jwt: AuthService) { }

  async findOne(loginDto:LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email:loginDto.email
          },
      });
     if (!user) throw new UnauthorizedException("Erro na credenciais");
      const compare = user.password==loginDto.password
      console.log(compare)
      if(!compare) throw new UnauthorizedException("Erro na credenciais");
      const token = await this.jwt.signIn(user.name, user.id)
      return  token.access_token
     
    } catch (error) {
      //console.log(error)
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
