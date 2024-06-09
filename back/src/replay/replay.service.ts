import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReplayDto } from './dto/replay.dto';
import { Prisma } from '@prisma/client';
import { Replay } from './interface/interface.replay';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FormatData } from 'src/common/formatData/formatData';
import { SelectFieldsService } from 'src/common/select-fields.service';
import { Published } from 'src/@interface/post.interface';



@Injectable()
export class ReplayService {
    constructor(
        private prisma:PrismaService,
        private selectFieldsService:SelectFieldsService ,
        private formatData:FormatData
     ){}
     async createReaplyService(createReplay:Replay,id:number):Promise<Replay>{
        try{
        const newReplay ={...createReplay,authorId:id}
        const replay = await this.prisma.replay.create({
            data:newReplay,
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
     
     async getUniqueReplay(id:string): Promise<Published | string>{
        try{
       const post = await this.prisma.replay.findUnique({
            where:{
                id:Number(id)
            },
            select:this.selectFieldsService.getDataSelectFields()
        })
         if(!post) throw new Error('sem posts') 
         return this.formatData.formatUniqueData(post)
        
        }catch(err){
          throw new HttpException('Erro desconhecido', HttpStatus.NOT_FOUND);
        
        }
}
}
