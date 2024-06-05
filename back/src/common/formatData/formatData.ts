import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Injectable } from '@nestjs/common';
import { PostsOut } from 'src/common/formatData/interface/postsOut';
import { Published } from 'src/@interface/post.interface';

@Injectable()
export class FormatData {
    serializeData(posts: PostsOut[]): Published[] {
        return posts.map(user => ({
            id: user.id,
            author: user.author.name,
            content: user.content,
            createdAt: format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
        }));
      }
      formatUniqueData(published:PostsOut):Published{
        return{
            ...published,
            author:published.author.name, 
            createdAt: format(new Date(published.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
        }
      }
}
