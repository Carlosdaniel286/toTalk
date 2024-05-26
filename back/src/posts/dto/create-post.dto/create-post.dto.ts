import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreatePostDto   {
    
    @IsNotEmpty({message:'Existe campo vazio'})
    @IsString()
    readonly content:string;
   
    @IsNumber()
    @IsNotEmpty({message:'Existe campo vazio'})
    readonly authorId:number
}
