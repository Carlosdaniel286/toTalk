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
     const response = await apiSearchPost(id)
     setPost(response)
    }
    const apiCreateComment=()=>{
        const idPosts = Number(id)
        const formComments={
            idPosts,
            content:contentComments
        }
        socket.emit('comments',formComments)
        socket.on("comments", (comments:comments) => {
           setCommentList([...commentList,comments])
        });
    }

 useEffect(()=>{
  searchPost()
 },[])
    
    
    
    
    
    
    
    
    
    return{apiCreateComment,commentList,post,setContentComments,contentComments}

}