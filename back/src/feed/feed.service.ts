import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FormatData } from 'src/common/formatData/formatData';

@Injectable()
export class FeedService {
  constructor(private readonly primsa: PrismaService,private readonly formData:FormatData) { }
  async findAll(authorId:number) {
    const posts = await this.primsa.post.findMany({
      orderBy: {
        createdAt: 'desc', // Ordena os resultados pela data de criação em ordem descendente
      },
      select: {
        author: {
          select: {
            name: true,
            id:true
          }
        },
        id: true,
        content: true,
        createdAt: true,
        countComments:true
      },
    })
    const formatPost = this.formData.serializeData(posts,authorId)
    return formatPost;
  }

 


}
