'use client'
import { CreatPost } from "@/components/createPosts/createPosts"
import { Overlay } from "@/components/overlay/overlay"
import style from './create.style.module.css'
import { ChangeEvent } from "react"

type CreateComments={
 onClose?:()=>void
 onClick?:()=>void
 onChange?:(ev:ChangeEvent<HTMLTextAreaElement>)=>void
 value?:string
}
export function CreateComments({onClick,onClose,onChange,value}:CreateComments) {
   return(
    <Overlay
      onClose={onClose}
    >
    <div className={style.createPost}>
      <CreatPost
      placeholder="sua resposta..."
      onClick={onClick}
      onClose={onClose}
     
      onChange={onChange}
      value={value}
      />
     </div>
    </Overlay>
    
   )
}