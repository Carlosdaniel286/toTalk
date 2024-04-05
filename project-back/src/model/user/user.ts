import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly identification: string;
 
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Endereço de e-mail inválido' })
  readonly email :string
  
  
  @IsString({message:"Erro de tipo"})
  @IsNotEmpty({message:"Senha vazia"})
  readonly password:string
  
 
  
}
/* name  String
  active Boolean @default(true)
  identification String @unique
  password String */