'use client'
import { useEffect, useState } from "react";
import { socket } from "../api/socket";
import { comments } from "@/@types/comments";
import { posts } from "@/@types/post";
import { useParams } from "next/navigation";
import { apiSearchPost } from "../api/seachPost";


export  function useCostumComments(){
    const [commentList, setCommentList] = useState<comments[]>([]);
    const [post, setPost] = useState<posts | undefined>(); 
    const params = useParams();
    const id = params.slug as string;
    const [contentComments, setContentComments] = useState('');
    const searchPost=async()=>{
    socket.emit('getcomment',{postId:Number(id)})
    socket.on("getcomment", (comments:comments[]) => {
        console.log(comments)
        setCommentList(comments)
    });
     const response = await apiSearchPost(id)
     setPost(response)
    }
    const apiCreateComment=()=>{
        const postId = Number(id)
        const formComments={
            postId,
            content:contentComments
        }
        socket.emit('comment',formComments)
        socket.on("comment", (comments:comments) => {
            const newComments = [...commentList]
            newComments.unshift(comments)
            setCommentList(newComments)
            setContentComments('')
        });
    }

    


    //getcomment
 


useEffect(()=>{
  searchPost()
 },[])
    
    
    
    
    
    
    
    
    
    return{apiCreateComment,commentList,post,setContentComments,contentComments}

}