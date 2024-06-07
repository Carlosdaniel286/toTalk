import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCommentDto } from 'src/commen/dto/create-comment.dto';

export class CreateReplayDto extends CreateCommentDto {
    @IsNumber()
    @IsNotEmpty({ message: 'Existe campo vazio' })
    readonly commentsId: number;
}