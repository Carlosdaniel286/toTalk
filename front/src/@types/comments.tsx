import { posts } from "./post"
export type comments = posts&{
    postId:number,
    
}