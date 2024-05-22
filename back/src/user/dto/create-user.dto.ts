import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty,IsStrongPassword,IsString,IsAlpha} from 'class-validator';


export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({message:'Existe campo vazio'})
  @IsStrongPassword({ minLength: 8, minNumbers: 1, minUppercase: 1, minLowercase: 1, minSymbols:1}, {message:'A senha deve ter no mínimo 8 caracteres, com pelo menos 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.'})
  readonly password: string;
  
  @ApiProperty()
  @IsNotEmpty({message:'Existe campo vazio'})
  @IsString({"message":"erro name"})
  @IsAlpha()
  readonly name:string
}
