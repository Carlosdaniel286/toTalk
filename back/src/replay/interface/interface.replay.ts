import { Published } from "src/@interface/post.interface";

export interface Replay extends Published{
    postId:number,
    commentsId:number
}