import { Module } from '@nestjs/common';
import { CreateUserService } from './user.Service';
import { CreateUserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from '../login/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/@environment.variable';


@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [CreateUserController],
  providers: [CreateUserService, PrismaService, AuthService],
})
export class CreateUserModule { }