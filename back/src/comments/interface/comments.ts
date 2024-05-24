import { Published } from 'src/@interface/post.interface';

export interface  Comments  extends Published {
    postId: number;
}