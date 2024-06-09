'use client'
import { useEffect, useState, useCallback } from "react";
import { socket } from "../api/socket";
import { comments } from "@/@types/comments";
import { posts } from "@/@types/post";
import { useParams } from "next/navigation";
import { apiSearchPost } from "../api/seachPost";
import { useRouter } from 'next/navigation';

export function useCustomComments() {
    const [commentList, setCommentList] = useState<comments[]>([]);
    const [post, setPost] = useState<posts | null>(null); 
    const [contentComments, setContentComments] = useState('');
    const params = useParams();
    console.log(params)
    const type = params.slug[0].toString()
    const id = params.slug[1].toString() 
    const slug = type=='post'?'comment':'replay'
    const [close , setClose]=useState(false)
    
    
    const onClose=()=>{
        setClose(!close)
    }
    const onClick=()=>{
        setClose(false)
        apiCreateComment()
    }
    
const fetchPost =  async() => {
        const response = await apiSearchPost(id,type);
        setPost(response);
        console.log(response)
        socket.emit(`get${slug}`, { postId: Number(id) });
        socket.on(`get${slug}`, (comments: comments[]) => {
            setCommentList(comments);
        });
    };

    const apiCreateComment =() => {
        const slugId = Number(id);
        
        const formComments = {
            postId:type=='post'?slugId:post?.postId,
            content: contentComments,
            commentsId:slug=='replay'?slugId:undefined
        };
        socket.emit(slug, formComments);
        socket.on(slug, (comment: comments) => {
            const newComments =[...commentList]
            newComments.unshift(comment)
           setCommentList(newComments);
            setContentComments('');
        });
        
    }

    useEffect(() => {
      fetchPost();

        return () => {
            socket.off('getcomment');
            socket.off('comment');
        };
    }, []);

    return {
        apiCreateComment,
        commentList,
        post,
        setContentComments,
        contentComments,
        close,
        onClose,
        onClick,
        
    };
}
