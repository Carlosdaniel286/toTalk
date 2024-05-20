import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { Prisma ,user } from '@prisma/client';
import { CreateUserService } from './createUser.Service';
@Controller()
export class CreateUserController {
  constructor(private readonly createUserService:CreateUserService) {}

  @Post('/createUser')
 async getHello(@Body() createUserDto: CreateUserDto): Promise<user | string> {
    try{
       return await this.createUserService.createUser(createUserDto)
      }catch(err){
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if (err.code === 'P2002') {
                return'There is a unique constraint violation, a new user cannot be created with this email'
                
              }
         }
         throw err
    }
    
  }
}
