import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserServiceLogin } from '../login/login.service';
import { AuthService } from '../login/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/@environment.variable';
import { LoginController } from './login.controller';
@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
    
  }),],
  controllers: [LoginController],
  providers: [PrismaService, UserServiceLogin, AuthService],
})
export class LoginModule { }