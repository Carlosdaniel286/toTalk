import { Post } from "../post/post"
import { propsPost } from "@/@types/post"

export const Comments =({content,id}:propsPost)=>{
  return(
    <div >
    <Post
      content={content}
      id={id}
    />
   </div>
  )
}