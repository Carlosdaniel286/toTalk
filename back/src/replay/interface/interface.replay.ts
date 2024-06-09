import { Published } from "src/@interface/post.interface";
import { Comments } from "src/comments/interface/comments";
export interface Replay extends Comments{
    commentsId:number
}