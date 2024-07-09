import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // ajuste o caminho conforme a estrutura do seu projeto

@Injectable()
export class CountLikes {
  constructor(private prisma: PrismaService) {}

  async incrementLikesComments(userId:number,commentId:number): Promise<number> {
    try {
        console.log(commentId )
        console.log(userId)
        const existingLike = await this.prisma.likes.findMany({
            where: {
                authorId: userId,
                commentId: commentId,
              
            },
          });
          console.log("existingLike")
     console.log(existingLike)
     if(!existingLike) return
     
     await this.prisma.likes.create({
        data:{
            
           authorId: userId,
           commentId
        }
      })
     
       const comments =  await this.prisma.comment.update({
         where:{
           id:commentId
         },
         data:{
           countLike: {
             increment: 1
           }
         }
        })
       
       return comments.postId
    } catch (err) {
      console.error(err);
      throw new HttpException('Erro ao atualizar comentário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async decrementLikeComments(userId:number,commentId:number): Promise<number> {
    try {

        await this.prisma.likes.deleteMany({
            where:{
              authorId: userId,
              commentId
            }
          })
         
           const comments = await this.prisma.comment.update({
             where:{
               id:commentId
             },
             data:{
               countLike: {
                 decrement: 1
               }
             }
            })
           
           return comments.postId
    
       
      
     
    } catch (err) {
      console.error('Failed to update comment likes:', err);
      throw new HttpException('Erro ao atualizar likes do comentário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
