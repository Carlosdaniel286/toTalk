import { IsNotEmpty,IsString, IsNumber} from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty({message:'Existe campo vazio'})
    @IsString()
    readonly content:string
    
    @IsNumber()
    @IsNotEmpty({message:'Existe campo vazio'})
    readonly postId:number

    @IsNumber()
    @IsNotEmpty({message:'Existe campo vazio'})
    readonly authorId:number
}
