import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CreateUserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ReplayModule } from './replay/replay.module';
import { LoginModule } from './login/login.module';
import { LoggerMiddleware} from './common/logger-middleware/logger-middleware.middleware';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [CreateUserModule, PostsModule, CommentsModule, ReplayModule,LoginModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/createUser', method: RequestMethod.POST },
        { path: '/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}