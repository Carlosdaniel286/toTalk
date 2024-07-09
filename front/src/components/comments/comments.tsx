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
  isCreator,
  onDecrementLike,
  onIncrementLike,
  countLiked
}:propsPost)=>{

  return(
    < >
     <Post
      content={content}
      countLiked={countLiked}
      onClickEdit={onClickEdit}
      countComments={countComments}
      onClick={onClick}
      onClickDelete={onClickDelete}
      isCreator={isCreator}
      onDecrementLike={onDecrementLike}
      onIncrementLike={onIncrementLike}
      style={{
        border:'0px',
        wordBreak:"break-word",
        ...style
      }}
    />
  
   </>
  )
}