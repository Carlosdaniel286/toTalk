import {
  Body,
  Controller,
  Res,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../../providers/user/app.service';
import { CreateUserDto } from 'src/model/user/user';
import { Response } from 'express';

@Controller()
export class userController {
  constructor(private readonly appService: UserService, ) {}
  
  @Post('/user')
  @UsePipes(new ValidationPipe({ transform: true }))
  
  async creatUser(@Body() createUserDto: CreateUserDto,@Res() res: Response) {
    try{
     await this.appService.creatUser(createUserDto)
     res.status(200).send("certo")
    }catch(err){
     if (err instanceof Error) {
     return res.status(400).send(err.message)
    }
    res.status(400).send("falha no servidor")
      
  }
}
}