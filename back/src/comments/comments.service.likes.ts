import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // ajuste o caminho conforme a estrutura do seu projeto

@Injectable()
export class CommentLikesService {
  constructor(private prisma: PrismaService) {}

  async updateLikes(commentId: number,parentId:number| undefined): Promise<void> {
    try {
      await this.prisma.comment.update({
        where: { 
          id: commentId, 
          parentId
        },
        data: {
          quantityComments:{
            increment:1
          }
        },
      });
    } catch (err) {
      console.error('Failed to update comment likes:', err);
      throw new HttpException('Erro ao atualizar likes do comentário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
