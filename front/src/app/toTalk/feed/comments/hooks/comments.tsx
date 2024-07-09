'use client'
import { useEffect, useState, useCallback } from "react";

import { socket } from "../api/socket";
import { comments } from "@/@types/comments";
import { posts } from "@/@types/post";
import { useParams } from "next/navigation";
import { apiSearchPost } from "../api/seachPost";
import { apiDeleteComments } from '../api/delete.comments';
import { isEmpty } from "@/functions/validations/validation";
import { v4 as uuidv4 } from 'uuid';
import { useCommentCount } from "@/contexts";
type UpdatePosts = {
    content: string | null,
    key: string | null,
    id: number | null,
};
export function useCustomComments() {
    const [commentList, setCommentList] = useState<comments[]>([]);
    const [post, setPost] = useState<posts | null>(null);
    const [contentComments, setContentComments] = useState('');
    const [close, setClose] = useState(false);
    const params = useParams();
    const type = params.slug[0].toString();
    const id = params.slug[1].toString();
    
   
   
    const incrementLikeComments = (commentsId:number) => {
        socket.emit('incrementLikeComments', commentsId);
        socket.on(`incrementLikeComments${id}`, (commentsId:number) => {
           const comments = [...commentList];
            const updateLike = comments.map((item) => {
              if (item.id === Number(commentsId)) { // Convertendo para número se necessário
                return { ...item, countLike: item.countLike + 1 };
              }
              return item;
            });
            setCommentList(updateLike);
            
           
        });
    }
    //decrementLikeComments
    const decrementLikeComments = (commentsId:number) => {
        socket.emit('decrementLikeComments', commentsId);
        socket.on(`decrementLikeComments${id}`, (commentsId:number) => {
           
            const comments = [...commentList];
            const updateLike = comments.map((item) => {
              if (item.id === Number(commentsId)) { // Convertendo para número se necessário
                return { ...item, countLike: item.countLike - 1 };
              }
              return item;
            });
            setCommentList(updateLike);
            
        }); 
    }
    
    
    const [postUnique, setPostUnique] = useState<UpdatePosts>({
        content: null,
        key: null,
        id: null,
      });
    
      const [comments, setComments] = useState<UpdatePosts>({
        content: null,
        key: null,
        id: null,
      });
      const {updateCommentCount}=useCommentCount()
   
    const toggleClose = useCallback(() => {
        setClose(prev => !prev);
    }, []);

    const handleCommentCreate = useCallback(() => {
        setClose(false);
        createComment();
    }, [contentComments]);

    const fetchPost = useCallback(async () => {
        try {
            const response = await apiSearchPost(id, type);
            setPost(response);
            const object = type === 'comment' ? { parentId: Number(id) } : { postId: Number(id) };
            const event = type === 'comment' ? 'getResponseComments' : 'getcomment';
           if(response)updateCommentCount(response.countComments)
            socket.emit(event, object);
            socket.on(event, (comments: comments[]) => {
                
               setCommentList(comments);
            });

        } catch (error) {
            console.error('Failed to fetch post', error);
        }
    }, [id, type]);

    const createComment = useCallback(() => {
        const slugId = Number(id);
        const  empty = isEmpty(contentComments)
        if(empty.error) return
        const formComments = {
            postId: type === 'post' ? slugId : post?.postId,
            content: contentComments,
            parentId: type === 'post' ? undefined : slugId,
        };
        updateCommentCount('increment')
        socket.emit('comment', formComments);
    }, [id, type, contentComments, post?.postId]);

    const deleteComment = useCallback(async (id: number) => {
        try {
            await apiDeleteComments(id);
            setCommentList(prevComments => prevComments.filter(comment => comment.id !== id));
            updateCommentCount('decrement')
        } catch (error) {
            console.error('Failed to delete comment', error);
        }
    }, []);

    useEffect(() => {
        console.log(commentList)
        const handleNewComment = (comment: comments) => {
              const key = uuidv4();
            setCommentList(prevComments => [comment, ...prevComments]);
            setContentComments('');
            setComments({
                ...comments,
                key
                });
        };

        socket.on('getResponseComments', (comments: comments[]) => {
            setCommentList(comments);
        });
        
//decrementLikeComments

   

socket.on('comment', handleNewComment);

        fetchPost();

        return () => {
            socket.off('getResponseComments');
            socket.off('comment', handleNewComment);
        };
    }, [fetchPost]);

    return {
        apiCreateComment: createComment,
        commentList,
        post,
        setContentComments,
        contentComments,
        close,
        onClose: toggleClose,
        onClick: handleCommentCreate,
        deleteComment,
        setPost,
        setCommentList,
        postUnique, 
        setPostUnique,
        comments, 
        setComments,
        incrementLikeComments,
        decrementLikeComments,
        
    };
}