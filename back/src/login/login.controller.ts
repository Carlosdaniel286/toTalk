import { Body, Controller, Get, Post, Res ,Req} from '@nestjs/common';
import { UserServiceLogin } from './login.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller()
export class LoginController {
  constructor(private readonly userServiceLogin : UserServiceLogin ) {}
  @Post("/login")
 async login(@Res({ passthrough: true })res:Response, @Body()loginDto:LoginDto  ) {
    console.log(loginDto)
    const token =  await this.userServiceLogin.findOne(loginDto)
    res.header('token', token)
   return "login feito com sucesso"
  }
 @Get("/Token")
  async checkToken() {
    return "sucesso"
   }
}


