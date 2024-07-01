'use client'
import { CreatPost } from "@/components/createPosts/createPosts"
import { Overlay } from "@/components/overlay/overlay"
import style from './create.style.module.css'
import { ChangeEvent } from "react"
import { useMediaQuery } from "react-responsive"

type CreateComments={
 onClose?:()=>void
 onClick?:()=>void
 onChange?:(ev:ChangeEvent<HTMLTextAreaElement>)=>void
 value?:string
}
export function CreateComments({onClick,onClose,onChange,value}:CreateComments) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' });
   return(
    <Overlay
      onClose={onClose}
      background={isTabletOrMobile?'white':undefined}
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