'use client'

import { Post } from "../post/post"
import { propsPost } from "@/@types/post"
import { posts } from "@/@types/post"


export const Comments =({content,id,style}:propsPost)=>{
  return(
    < >
    <Post
      content={content}
      id={id}
      typePost={"comments"}
      style={{
        border:'0px',
        wordBreak:"break-word",
        ...style
      }}
    />
   </>
  )
}