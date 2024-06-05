import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReplayDto } from './dto/replay.dto';
import { Prisma } from '@prisma/client';
import { Replay } from './interface/interface.replay';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Injectable()
export class ReplayService {
    constructor(private prisma:PrismaService){}
     async createReaplyService(createReplay:CreateReplayDto):Promise<Replay>{
        try{
        
        const replay = await this.prisma.replay.create({
            data:createReplay,
            select:{
                author:{
                    select:{
                        name:true
                    }
                },
                id:true,
                postId:true,
                content: true,
                createdAt: true,
                commentsId:true,
            }
        })
        
        await this.prisma.replayComment.create({
            data:{
             comment: { connect: 
                { id: replay.commentsId },
             },
             replay:{ connect: 
                { id: replay.id },
             },
            }
          })
        
        const formattedReplay = {
            ...replay,
            author: replay.author.name,
            createdAt: format(new Date(replay.createdAt), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
          };
          
        return formattedReplay
        
      }catch(err){
        console.log(err.message)
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                console.log(err.message)
            }
            throw new HttpException(err, HttpStatus.NOT_FOUND);

        }
     }
}
