import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CreateUserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ReplayModule } from './replay/replay.module';
import { LoginModule } from './login/login.module';

@Module({

  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [CreateUserModule, PostsModule, CommentsModule, ReplayModule,LoginModule],
})
export class AppModule { }
