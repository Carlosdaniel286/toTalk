import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Prisma} from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService){}
  async create(createCommentDto: CreateCommentDto) {
    try{
   return await this.prisma.comment.create({
      data:createCommentDto
    })
   }catch(err){
  
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2003') {
       if(err.meta["field_name"]=="postId"){
          throw new HttpException('Esse post não existe', HttpStatus.CONFLICT);
        }
        throw new HttpException('Este Usuário não existe', HttpStatus.CONFLICT);

      }
    }
    throw new HttpException('Erro desconhecido', HttpStatus.FORBIDDEN);
  }
  }
  
  
}
