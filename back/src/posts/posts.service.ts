import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto/create-post.dto';
import { PrismaService } from 'src/prisma.service';
import { Published } from '../@interface/post.interface';
import { Prisma } from '@prisma/client';
import { FormatData } from 'src/common/formatData/formatData';
import { SelectFieldsService } from 'src/common/select-fields.service';


@Injectable()
export class PostsService {
    constructor(
        private prisma: PrismaService,
        private readonly formatData:FormatData,
        private readonly selectFieldsService:SelectFieldsService 
    ) {}
    
    async createPostService(createPostDto:CreatePostDto): Promise<Published >{
    try{
     const published = await this.prisma.post.create({
           data:createPostDto,
            select:this.selectFieldsService.getDataSelectFields('post')
            
        })
      return this.formatData.formatUniqueData(published,createPostDto.authorId)
        }catch(err){
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2003') {
                  throw new HttpException('Este Usuário não existe', HttpStatus.NOT_FOUND);
                }
              }
              throw new HttpException('Erro desconhecido', HttpStatus.FORBIDDEN);
        }
        
    
    }
    async getUniquePost(id:string): Promise<Published | string>{
        try{
       const post = await this.prisma.post.findUnique({
            where:{
                id:Number(id)
            },
            select:this.selectFieldsService.getDataSelectFields('post')
        })
         if(!post) throw new Error('sem posts') 
         return this.formatData.formatUniqueData(post,Number(id))
        
        }catch(err){
          console.log(err)
          throw new HttpException('Erro desconhecido', HttpStatus.NOT_FOUND);
        
        }
}

async deletePost(authorId:number,postId:number):Promise<string>{
  try{
    
    const comments = await this.prisma.comment.findMany({
      where:{
       postId,
       }
   })
   console.log(comments)
  
    
 
 

   


  
  await this.prisma.comment.deleteMany({
    where:{
     postId
    }
 })
     
   
   const deletedPost = await this.prisma.post.delete({
  where:{
    authorId,
    id:postId,
  },
  select:this.selectFieldsService.getDataSelectFields('post')
 })
   
 
 if (!deletedPost) {
  // Lança um erro se o post não existir ou não puder ser excluído
  //throw new Error('Post not found or unable to delete post.');
}
console.log('deu certo')
   return 'post apagado'
  
  }catch(err){
  console.log(err)
    if(err instanceof Error){
      throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('Erro desconhecido', HttpStatus.NOT_FOUND);
  
  }
}
}



//uniquePost/${id}