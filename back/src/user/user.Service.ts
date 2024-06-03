
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';
import { Message } from './interface/message';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class CreateUserService {
  constructor(private prisma: PrismaService) { }

  async createUser(createUserDto: CreateUserDto): Promise<Message> {
    try {
      const regexCapitalLetter = /(?=[A-Z])/;
      const usarName = createUserDto.name.split(regexCapitalLetter).join(' ')
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      
      await this.prisma.user.create({
        data: {...createUserDto,
          name:usarName,
          password:hashedPassword
        }
      });
      return { message: "Usuário criado com sucesso" };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new HttpException('Este conta já existe', HttpStatus.FORBIDDEN);
        }
      }
      throw new HttpException("Erro na solicitação", HttpStatus.FORBIDDEN);
    }
  }
}
