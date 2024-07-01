'use client'
import { Scroll } from '@/components/scroll/scroll';
import { Post } from '@/components/post/post';
import style from '../styles/comments.module.css';
import { CreatPost } from '@/components/createPosts/createPosts';
import { Comments } from '@/components/comments/comments';
import { useCustomComments } from '../hooks/comments';
import { CreateComments } from '../components/createComments';
import { useParams, useRouter } from 'next/navigation';
import { EditPost } from '../../../../../components/editPost/editPost';
import { useEffect, useState, useCallback } from 'react';
import { apiEditComments } from '../api/apiEditComments';
import { v4 as uuidv4 } from 'uuid';
import { apiDeletePost } from '../../[feed]/api/api.post';
import { apiEditPost } from '../../[feed]/api/apiEditPost';
import 'sweetalert2/dist/sweetalert2.min.css';
import './alert.css'
import Swals from 'sweetalert2';
import Swal from 'react-sweetalert2';
import { useMediaQuery } from 'react-responsive';
type UpdatePosts = {
    content: string | null,
    key: string | null,
    id: number | null,
};

export default function RenderComments() {
  const {
    post,
    setPost,
    commentList,
    contentComments,
    setContentComments,
    apiCreateComment,
    onClose,
    close,
    onClick,
    deleteComment,
    setCommentList,
  } = useCustomComments();
  const router = useRouter();
  const { slug } = useParams();
  const type = slug[0].toString();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const [showEditComments, setShowEditComments] = useState(false);
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

  const handlePublication = useCallback((content: string) => {
    setPostUnique((prev) => ({ ...prev, content }));
    setComments((prev) => ({ ...prev, content }));
  }, []);

  useEffect(() => {
    console.log(`${post?.id}-${comments.key}`);
  }, [post, postUnique,comments]);

  const handleEdit = async (key: string) => {
    if (postUnique.content && postUnique.id) {
      if (type === 'post') {
        await apiEditPost(postUnique.id, postUnique.content);
      }
      if (post) {
        setPost({
          ...post ,content:postUnique.content
        })
      }
      setPostUnique((prev) => ({ ...prev, key }));
    } 
    
    if (comments.content && comments.id) {
       
          console.log(comments.content , comments.id)
        await apiEditComments(comments.id, comments.content);
       const newComments =[...commentList]
       const updatedComments = newComments.map((item) =>{
          if(item.id === comments.id && comments.content){
           return {...item,content:comments.content}
       }
        return item
      }
    );
      setCommentList(updatedComments);
      setComments({
      ...comments,
      key
      });
    }
  
};
  
  return (
    <main className={style.main}>
     {close && (
        <CreateComments
          value={contentComments}
          onChange={(ev) => setContentComments(ev.target.value)}
          onClick={onClick}
          onClose={onClose}
        />
      )}

      {showEditComments && (
        <EditPost
          value={postUnique.content || comments.content || ""}
          onChange={(ev) => handlePublication(ev)}
          onClick={async () => {
            const key = uuidv4();
            await handleEdit(key);
            setShowEditComments(false);
          }}
          onClose={() => setShowEditComments(false)}
        />
      )}

      <Scroll style={{ maxHeight: '93vh' }} renderFloating={false} lastSpace={false}>
        {post && (
          <div key={`${post.id}/${postUnique.key}`}>
            <Post
              style={{
                borderBottom: '1px solid rgba(185, 180, 180, 0.4)',
                width: '100%',
                maxWidth: '650px',
              }}
              content={post}
              isCreator={post.isCreator}
              renderFullPost={true}
              onClick={onClose}
              onClickEdit={() => {
                setComments({ content: null, id: null, key: null });
                setPostUnique({ content: post.content, id: post.id, key: null });
                setShowEditComments(true);
              }}
              onClickDelete={async () => {
                 if (type === 'post') {
                  Swals.fire({
                    title:'Excluir post?',
                    text:'Essa ação não poderá ser desfeita, e o post será removido do seu perfil, da timeline de todas as contas que seguem você e dos resultados de busca. ',
                    confirmButtonText:'exclui',
                    showCancelButton:true,
                    showConfirmButton:true,
                    confirmButtonColor:'red',
                    width:'400px',
                    cancelButtonText:'cancelar',
                    preConfirm:(async()=>{
                      await apiDeletePost(post.id);
                       router.back()  
                    })
                    });
                 // 
                } else if (type === 'comment') {
                  Swals.fire({
                    title:'Excluir post?',
                    text:'Essa ação não poderá ser desfeita, e o post será removido do seu perfil, da timeline de todas as contas que seguem você e dos resultados de busca. ',
                    confirmButtonText:'exclui',
                    showCancelButton:true,
                    showConfirmButton:true,
                    confirmButtonColor:'red',
                    width:'400px',
                    cancelButtonText:'cancelar',
                    preConfirm:(async()=>{
                      await deleteComment(post.id)
                      router.back() 
                    })
                    });
               
                }
              }}
            />
          </div>
        )}

        <div className={style.chat}>
          <CreatPost
            style={{
              border: '1px solid rgba(185, 180, 180, 0.4)',
              borderRadius: 'none',
              marginTop: '10px',
              fontSize: '1.2rem',
            }}
            maxRows={11}
            buttonClose={false}
            value={contentComments}
            onChange={(ev) => setContentComments(ev.target.value)}
            placeholder='Postar sua Resposta'
            onClick={apiCreateComment}
            onClose={onClose}
          />
        </div>
        {commentList.length > 0 &&
          commentList.map((item) => (
            <div key={`${item.id}-${comments.key}`}>
              <Comments
                content={item}
                style={{ marginTop: '10px', maxWidth: '650px' }}
                onClickDelete={async () => {
                  Swals.fire({
                    title:'Excluir post?',
                    text:'Essa ação não poderá ser desfeita, e o post será removido do seu perfil, da timeline de todas as contas que seguem você e dos resultados de busca. ',
                    confirmButtonText:'exclui',
                    showCancelButton:true,
                    showConfirmButton:true,
                    confirmButtonColor:'red',
                    width:'400px',
                    cancelButtonText:'cancelar',
                    preConfirm:(async()=>{
                      await deleteComment(item.id)
                     
                    })
                    });
                } }
                isCreator={item.isCreator}
                onClickEdit={() => {
                  setPostUnique({ ...postUnique, content: null, id: null, key: '' });
                  setComments({...comments, content: item.content, id: item.id, key: '' });
                  setShowEditComments(true);
                }}
                onClick={() => {
                  console.log(item.postId);
                  router.push(`/toTalk/feed/comments/comment/${item.id}`);
                }}
              />
            </div>
          ))}
      </Scroll>
    </main>
  );
}
