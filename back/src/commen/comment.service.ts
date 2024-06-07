//import { comments } from '@/@types/comments';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Comments } from './interface/comments';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FormatData } from 'src/common/formatData/formatData';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService, private readonly formData:FormatData) {}
  async createComments(createCommentDto: CreateCommentDto): Promise<Comments> {
  try {
    const {replayId ,...newCreateCommentDto}= createCommentDto
      const comment = await this.prisma.comment.create({
        data: newCreateCommentDto,
        select: {
          author: {
            select: {
              name: true,
            },
          },
          content: true,
          postId: true,
          id:true,
          createdAt: true,
        },
      });

       if(createCommentDto.replayId){
        await this.prisma.replayComment.create({
          data:{
            comment: { connect: { id: comment.id } },
            replay:{ connect: { id:createCommentDto.replayId }}
          }
          })
      }
     const formattedComments = {
        ...comment,
        author: comment.author.name,
        createdAt: format(new Date(comment.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
      };
      
      return formattedComments;
    } catch (err) {
      console.log(err)
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          if (err.meta?.['field_name'] === 'postId') {
            throw new HttpException('Esse post não existe', HttpStatus.NOT_FOUND);
          }
          throw new HttpException('Este Usuário não existe', HttpStatus.NOT_FOUND);
        }
      }

      // Lida com outros erros desconhecidos
      throw new HttpException('Erro desconhecido', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getAllComments(idPost:number) {
    const comments = await this.prisma.comment.findMany({
      where:{
       id:idPost
      },
      orderBy: {
        createdAt: 'desc', // Ordena os resultados pela data de criação em ordem descendente
      },
      select:{
        author:{
            select:{
                name:true
            }
        },
        id:true,
        content:true,
        createdAt:true
    },
    });
   
   return this.formData.serializeData(comments)

  }

}
