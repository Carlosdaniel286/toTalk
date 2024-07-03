import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // ajuste o caminho conforme a estrutura do seu projeto

@Injectable()
export class Count {
  constructor(private prisma: PrismaService) {}

  async countComments(postId:number,commentId?:number): Promise<void> {
    try {
      
       await this.prisma.quantityComments.create({
         data: {
          commentId,
          postId
        },
      });
       await this.prisma.post.update({
        where:{
          id:postId
        },
        data:{
          countComments: {
            increment: 1
          }
        }
       })
       if(commentId){
       await this.prisma.comment.update({
        where:{
          id:commentId
        },
        data:{
          countComments: {
            increment: 1
          }
        }
       })
      }
    } catch (err) {
      console.error('Failed to update comment likes:', err);
      throw new HttpException('Erro ao atualizar comentário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async decrementComment(postId:number,parentId?:number): Promise<void> {
    try {
      
     await this.prisma.post.update({
        where:{
          id:postId
        },
        data:{
          countComments: {
            decrement: 1
          }
        }
       })
       if(parentId){
        await this.prisma.comment.update({
          where:{
            id:parentId
          },
          data:{
            countComments: {
              decrement: 1
            }
          }
         })
       }
      
     
    } catch (err) {
      console.error('Failed to update comment likes:', err);
      throw new HttpException('Erro ao atualizar likes do comentário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
