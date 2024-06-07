
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Injectable } from '@nestjs/common';
import { PostsOut } from 'src/common/formatData/interface/postsOut';
import { Published } from 'src/@interface/post.interface';

@Injectable()
export class FormatData {
  serializeData(posts: PostsOut[]): Published[] {
     // Faz uma cópia da matriz original
    const copiedPosts= posts.map(post => ({
        id: post.id,
        author: post.author.name,
        content: post.content,
        createdAt: format(new Date(post.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
    }))
    console.log(copiedPosts)
    return [...copiedPosts]
}
      
      
      formatUniqueData(published:PostsOut):Published{
        return{
            ...published,
            author:published.author.name, 
            createdAt: format(new Date(published.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
        }
      }
}
