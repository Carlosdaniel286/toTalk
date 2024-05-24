import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto/create-post.dto';
import { PrismaService } from 'src/prisma.service';
import { Published } from '../@interface/post.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}
    async createPostService(createPostDto:CreatePostDto): Promise<Published>{
    try{
     const published = await this.prisma.post.create({
           data:createPostDto,
            select:{
                author:{
                    select:{
                        name:true
                    }
                },
                id:true,
                content:true,
                createdAt:true
            },
            
        })
       const post = {...published,author:published.author.name}
       return post
        }catch(err){
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2003') {
                  throw new HttpException('Este Usuário não existe', HttpStatus.NOT_FOUND);
                }
              }
              throw new HttpException('Erro desconhecido', HttpStatus.FORBIDDEN);
        }
        
    
    }
}
