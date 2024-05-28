import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FeedService {
  constructor(private readonly primsa:PrismaService){}
  async findAll() {
    const posts = await this.primsa.post.findMany({
      orderBy: {
        createdAt: 'desc', // Ordena os resultados pela data de criação em ordem descendente
      },
    })

    return posts;
  }

  
}
