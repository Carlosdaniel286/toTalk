import { IsNotEmpty, IsNumber,IsOptional} from 'class-validator';
import { CreatePostDto } from 'src/posts/dto/create-post.dto/create-post.dto';

export class CreateCommentDto extends CreatePostDto{
    @IsNumber()
    @IsNotEmpty({message:'Existe campo vazio'})
    readonly postId:number;
    @IsOptional()
    @IsNumber()
    @IsNotEmpty({message:'Existe campo vazio'})
    readonly replayId:number;
}
