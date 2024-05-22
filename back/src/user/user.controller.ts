import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma} from '@prisma/client';
import { CreateUserService } from './user.Service';
import { Message } from 'src/user/interface/message';


@Controller()
export class CreateUserController {
  constructor(private readonly createUserService:CreateUserService) {}

  @Post('/createUser')
 async createUser(@Body() createUserDto: CreateUserDto):Promise<Message> {
       const response = await this.createUserService.createUser(createUserDto)
       return response
      }
}
