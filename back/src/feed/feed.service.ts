import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PostsOut } from '../common/formatData/interface/postsOut';
import { Published } from 'src/@interface/post.interface';
import { FormatData } from 'src/common/formatData/formatData';

@Injectable()
export class FeedService {
  constructor(private readonly primsa: PrismaService,private readonly formData:FormatData) { }
  async findAll() {
    const posts = await this.primsa.post.findMany({
      orderBy: {
        createdAt: 'desc', // Ordena os resultados pela data de criação em ordem descendente
      },
      select: {
        author: {
          select: {
            name: true
          }
        },
        id: true,
        content: true,
        createdAt: true
      },
    })
    const formatPost = this.formData.serializeData(posts)
    return formatPost;
  }

 


}
