'use client'

import { Post } from "../post/post"
import { propsPost } from "@/@types/post"

import { useState } from "react"


export const Comments =({
  content,
  style,
  onClick,
  onClickDelete,
  onClickEdit,
  countComments,
  isCreator
}:propsPost)=>{

  return(
    < >
     <Post
      content={content}
      onClickEdit={onClickEdit}
      countComments={countComments}
      onClick={onClick}
      onClickDelete={onClickDelete}
      isCreator={isCreator}
      style={{
        border:'0px',
        wordBreak:"break-word",
        ...style
      }}
    />
  
   </>
  )
}