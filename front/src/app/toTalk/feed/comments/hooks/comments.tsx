'use client'
import { useEffect, useState, useCallback } from "react";
import { socket } from "../api/socket";
import { comments } from "@/@types/comments";
import { posts } from "@/@types/post";
import { useParams } from "next/navigation";
import { apiSearchPost } from "../api/seachPost";
import { apiDeleteComments } from '../api/delete.comments';
import { isEmpty } from "@/functions/validations/validation";

export function useCustomComments() {
    const [commentList, setCommentList] = useState<comments[]>([]);
    const [post, setPost] = useState<posts | null>(null);
    const [contentComments, setContentComments] = useState('');
    const [close, setClose] = useState(false);
    const params = useParams();
    const type = params.slug[0].toString();
    const id = params.slug[1].toString();

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
        socket.emit('comment', formComments);
    }, [id, type, contentComments, post?.postId]);

    const deleteComment = useCallback(async (id: number) => {
        try {
            await apiDeleteComments(id);
            setCommentList(prevComments => prevComments.filter(comment => comment.id !== id));
        } catch (error) {
            console.error('Failed to delete comment', error);
        }
    }, []);

    useEffect(() => {
        const handleNewComment = (comment: comments) => {
            setCommentList(prevComments => [comment, ...prevComments]);
            setContentComments('');
        };

        socket.on('getResponseComments', (comments: comments[]) => {
            setCommentList(comments);
        });

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
        setCommentList
    };
}
