import { IsNotEmpty, IsNumber, IsString,IsOptional } from 'class-validator';
export class CreatePostDto   {
    @IsNotEmpty({message:'Existe campo vazio'})
    @IsString()
    readonly content:string;
   
    @IsNumber()
    @IsNotEmpty({message:'Existe campo vazio'})
    readonly authorId:number
}
