import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber,IsOptional} from 'class-validator';
import { CreatePostDto } from 'src/posts/dto/create-post.dto/create-post.dto';

export class CreateCommentDto extends CreatePostDto{
   // @ApiProperty()
    @IsNotEmpty({message:'Existe campo vazio'})
    @IsNumber()
   readonly postId:number;
    @IsOptional()
   // @ApiProperty()
    @IsNotEmpty({message:'Existe campo vazio'})
    @IsNumber()
    readonly replayId:number;
}
