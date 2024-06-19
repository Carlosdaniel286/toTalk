import { Published } from 'src/@interface/post.interface';

export interface  Comments {
    postId: number;
    content:string;
    parentId?:number
}