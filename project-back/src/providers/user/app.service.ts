import { Injectable } from '@nestjs/common';
import { PrismaService} from 'src/database/prisma';
import { CreateUserDto } from 'src/model/user/user';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
   constructor(private prisma: PrismaService) {}
  async creatUser(createUserDto:CreateUserDto){
  try{
   await this.prisma.user.create({
    data:{
      name:createUserDto.name,
      identification:createUserDto.identification,
      password:createUserDto.password,
      email:createUserDto.email
    }
 })
}catch(err){
  if (err instanceof PrismaClientKnownRequestError) {
  if(err.code=="P2002"){
      throw new Error("essa conta já existe cpf ou email cadastrado")
    }
    throw new Error("erro inserperado")
}
throw new Error("erro inserperado")
  }
 }
}