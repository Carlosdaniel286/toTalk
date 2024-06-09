'use client'

import { useState } from "react";
import { socket } from "../api/socket";
import { comments } from "@/@types/comments";
import { useParams } from "next/navigation";

export function useCustomReplayComments() {

    const params = useParams();
    const id = params.slug as string;
    const [contentReplay, setContentReplay] = useState('');
    const [replayList, setReplayList] = useState<comments[]>([]);
    const [closeReplay , setCloseReplay]=useState(false)
    const [commentsId,setCommentsId]=useState<undefined|number>()
    
 const apiCreateReplay =() => {
    //router.push(`/toTalk/feed/comments/post/${item.id}`)
    
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
       setCloseReplay(!closeReplay)
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