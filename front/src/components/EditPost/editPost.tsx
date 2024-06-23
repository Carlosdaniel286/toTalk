import { CreatPost } from "../createPosts/createPosts";
import { Overlay } from "@/components/overlay/overlay";
import { useEditPostContext } from "@/contexts";
import { useState } from "react";

type editPost ={
    value?:string
    onClose?:(()=>void)
    onClick?:(()=>void)
    onChange?:((ev:string)=>void)
}


export function EditPost({value,onClick,onClose,onChange}:editPost) {
  
   
   return(
    <>
      <Overlay
      onClose={onClose}
      
       >
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '650px',
            minHeight: '300px',
            marginTop:'80px'
          }}
        >
        <CreatPost
         maxRows={10}
         value={value}
         onChange={((ev)=>{
            onChange ? onChange(ev.target.value):(()=>{})
         })}
         placeholder="Editar..."
         buttonValue="Editar"
         onClose={(()=>{
            if(onClose)onClose()
         })}
         onClickEdit={onClick}
        />
      </div>
      </Overlay>
    
    </>
   )
}