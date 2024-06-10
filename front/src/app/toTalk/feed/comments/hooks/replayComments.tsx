'use client'

import { useState } from "react";
import { socket } from "../api/socket";
import { comments } from "@/@types/comments";
import { useParams, useRouter } from "next/navigation";

export function useCustomReplayComments() {
    const router = useRouter();
    const params = useParams();
    const type = params.slug[0].toString()
    const id = params.slug[1].toString() 
    const [contentReplay, setContentReplay] = useState('');
    const [replayList, setReplayList] = useState<comments[]>([]);
    const [closeReplay , setCloseReplay]=useState(false)
    const [commentsId,setCommentsId]=useState<undefined|number>()
    
 const apiCreateReplay =() => {
   
if(!commentsId) return
         const formComments = {
            postId:Number(id),
            commentsId,
            content: contentReplay
        };
        socket.emit('replay', formComments);
        socket.on("replay", (comment: comments) => {
            console.log(comment)
            const newComments =[...replayList]
            newComments.unshift(comment)
           setReplayList(newComments);
            setContentReplay('');
        });
        
    }
    const onCloseReplay=(id?:number)=>{
      const slug = type=='post'?'comment':'replay'
        router.push(`/toTalk/feed/comments/${slug}/${id}`)
       if(!id) return
       setCommentsId(id)
    }
    return{
        apiCreateReplay,
        contentReplay,
        setContentReplay,
        onCloseReplay,
        closeReplay
    }
}