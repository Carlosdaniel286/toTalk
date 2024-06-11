
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Injectable } from '@nestjs/common';
import { PostsOut } from 'src/common/formatData/interface/postsOut';
import { Published } from 'src/@interface/post.interface';

@Injectable()
export class FormatData {
  serializeData(posts: PostsOut[],authorId:number): Published[] {
     // Faz uma cópia da matriz original
    const copiedPosts= posts.map(post => ({
        id: post.id,
        author: post.author.name,
        content: post.content,
        isCreator:authorId==post.author.id?true:false,
        createdAt: format(new Date(post.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
    }))
    
    return [...copiedPosts]
}
      
      
      formatUniqueData(published:PostsOut,authorId:number):Published{
        return{
            ...published,
            author:published.author.name, 
            isCreator:authorId==published.author.id?true:false,
            createdAt: format(new Date(published.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
        }
      }
}
