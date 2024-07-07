
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Injectable } from '@nestjs/common';
import { Published,PostField } from 'src/@interface/post.interface';

@Injectable()
export class FormatData {
  serializeData(posts: PostField[],authorId:number): Published[] {
    const copiedPosts= posts.map(post => ({
        id: post.id,
        author: post.author.name,
        content: post.content,
        isCreator:authorId==post.author.id?true:false,
        createdAt: format(new Date(post.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
        countComments:post.countComments
    }))
   
    return [...copiedPosts]
}    formatUniqueData(published:PostField,authorId:number):Published{
        return{
            ...published,
            author:published.author.name, 
            isCreator:authorId==published.author.id?true:false,
            createdAt: format(new Date(published.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
            countComments:published.countComments
        }
      }
}
