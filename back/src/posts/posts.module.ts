import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';
import { FormatData } from 'src/common/formatData/formatData';
import { SelectFieldsService } from 'src/common/select-fields.service';


@Module({
  providers: [PostsService,PrismaService,FormatData,SelectFieldsService ],
  controllers: [PostsController],
 
  
})
export class PostsModule {}
