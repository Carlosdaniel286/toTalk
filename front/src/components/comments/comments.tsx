'use client'

import { Post } from "../post/post"
import { propsPost } from "@/@types/post"

import { useState } from "react"


export const Comments =({content,id,style,onClick,onClickDelete,onClickEdit}:propsPost)=>{

  return(
    < >
     <Post
      content={content}
      onClickEdit={onClickEdit}
      id={id}
      onClick={onClick}
      onClickDelete={onClickDelete}
      isCreator={content.isCreator}
      style={{
        border:'0px',
        wordBreak:"break-word",
        ...style
      }}
    />
  
   </>
  )
}