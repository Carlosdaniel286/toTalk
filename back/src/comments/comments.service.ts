import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Comments } from './interface/comments';
import { FormatData } from 'src/common/formatData/formatData';
import { SelectFieldsService } from 'src/common/select-fields.service';
import { Published } from 'src/@interface/post.interface';
import { CommentLikesService } from './comments.service.likes';
import { UpdatePost } from 'src/posts/dto/create-post.dto/edite-post.dto';
import { CommentsUpdateDto } from './dto/edit.comments.dto';



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

  async getUniqueComments(id: string,authorId:number): Promise<Published | string> {
    try {
      const post = await this.prisma.comment.findUnique({
        where: {
          id: Number(id),
          
        },
        select: this.selectFieldsService.getDataSelectFields(),
      });

      if (!post) throw new Error('sem posts');
      return this.formData.formatUniqueData(post, authorId);
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
  async editComments(commentsUpdateDto:CommentsUpdateDto,postId:number,):Promise<Published | string>{
    try{
    const editPost = await this.prisma.comment.update({
    where:{
      authorId: commentsUpdateDto.authorId,
      id:postId,
    },
    data:{
      content:commentsUpdateDto.content
    },
    select:this.selectFieldsService.getDataSelectFields('post')
   })
    if (!editPost) {
    // Lança um erro se o post não existir ou não puder ser excluído
    throw new Error('Post not found or unable to delete post.');
  }
  return this.formData.formatUniqueData(editPost,commentsUpdateDto.authorId)
  
    
    }catch(err){
    console.log(err)
      if(err instanceof Error){
        throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Erro desconhecido', HttpStatus.NOT_FOUND);
    
    }
  }
  }
  

