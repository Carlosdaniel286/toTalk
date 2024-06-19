import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Comments } from './interface/comments';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FormatData } from 'src/common/formatData/formatData';
import { SelectFieldsService } from 'src/common/select-fields.service';
import { Published } from 'src/@interface/post.interface';
import { CommentLikesService } from './comments.service.likes';

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService,
    private readonly formData: FormatData,
    private readonly selectFieldsService: SelectFieldsService,
    private readonly commentLikesService: CommentLikesService
  ) {}

  async createComments(createCommentDto: Comments, authorId: number): Promise<Published> {
    try {
      const formartComments = { ...createCommentDto, authorId: authorId };
      const comment = await this.prisma.comment.create({
        data:formartComments,
         select:this.selectFieldsService.getDataSelectFields()
      });
      await  this.commentLikesService.updateLikes(comment.id,createCommentDto.parentId)
     return this.formData.formatUniqueData(comment,authorId);
    } catch (err) {
      console.log(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          if (err.meta?.['field_name'] === 'postId') {
            throw new HttpException('Esse post não existe', HttpStatus.NOT_FOUND);
          }
          throw new HttpException('Este Usuário não existe', HttpStatus.NOT_FOUND);
        }
      }
      throw new HttpException('Erro desconhecido', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUniqueComments(id: string): Promise<Published | string> {
    try {
      const post = await this.prisma.comment.findUnique({
        where: {
          id: Number(id),
          
        },
        select: this.selectFieldsService.getDataSelectFields(),
      });

      if (!post) throw new Error('sem posts');
      return this.formData.formatUniqueData(post, Number(id));
    } catch (err) {
      throw new HttpException('Erro desconhecido', HttpStatus.NOT_FOUND);
    }
  }

  async deletComments(id:number,authorId:number): Promise<string> {
    try {
      const comment = await this.prisma.comment.delete({
        where: {
          id,
          authorId
        },
      });
      if (!comment) throw new Error('sem posts');
      return 'Comentário deletado!'
    } catch (err) {
      throw new HttpException('Erro desconhecido', HttpStatus.NOT_FOUND);
    }
  }
}
