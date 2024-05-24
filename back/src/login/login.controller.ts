import { Body, Controller, Post, Res } from '@nestjs/common';
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
    res.cookie('key', token,{httpOnly:true})
   return "login feito com sucesso"
  }
}
