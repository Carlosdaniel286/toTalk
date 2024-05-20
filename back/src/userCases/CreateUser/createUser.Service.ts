
import { Injectable } from '@nestjs/common';
import {user} from '@prisma/client';
import { CreateUserDto } from './createUser.dto';
import { PrismaService } from '../../prisma.service';



@Injectable()
export class CreateUserService {
    constructor(private prisma: PrismaService) {}
   
    async createUser(createUserDto:CreateUserDto): Promise<user | null> {
        
        return this.prisma.user.create({
            data:createUserDto
        });
    }
}
