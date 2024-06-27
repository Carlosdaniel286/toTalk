'use client'
import { Scroll } from '@/components/scroll/scroll';
import { Post } from '@/components/post/post';
import style from '../styles/comments.module.css'
import { CreatPost } from '@/components/createPosts/createPosts';
import { Comments } from '@/components/comments/comments';
import { useCustomComments } from '../hooks/comments';
import { CreateComments } from '../components/createComments';
import { useRouter } from 'next/navigation';
import { EditPost } from '@/components/editPost/editPost';
import { useState } from 'react';
import { apiEditComments } from '../api/apiEditComments';
import { v4 as uuidv4 } from 'uuid';
export default function RenderComments() {
  const{
    post,
    setPost,
    commentList,
    contentComments,
    setContentComments,
    apiCreateComment,
    onClose,
    close,
    onClick,
    deleteComment
  }=useCustomComments()
  const router = useRouter();
  const[showEditComments,setShowEditComments]=useState(false)
  const[value,setValue]=useState({
    content:'',
    commentsId:0,
    key:'',
    keyComments:''
  })
 
 
 
  return (
    <main className={style.main}>
       {close && 
       <CreateComments
       value={contentComments}
       onChange={(ev) => setContentComments(ev.target.value)}
       onClick={onClick}
       onClose={onClose}
       />
       }

     {showEditComments && 
     <EditPost
     value={value.content}
     onChange={((ev)=>{

     setValue({
        ...value,
        content:ev
        })
      
      
     })}
    
     onClick={(async()=>{
      const key = uuidv4();
      await apiEditComments(value.commentsId,value.content)
      if(!post) return
      setPost({
        ...post,
        content:value.content,
      })
     
      setValue({
        ...value,
         key,
         keyComments:key
        })
      setShowEditComments(false)
     })}
     onClose={(()=>{
      setShowEditComments(false)
     })}
     />
     }

     <Scroll 
        style={{
          maxHeight: '93vh',
        }}
        renderFloating={false}
        lastSpace={false}
      >
        {post && 
         <div key={`${post.id}${value.key}`} >
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
            onClickEdit={(()=>{
              setValue({
                ...value,
                content:post.content,
                commentsId:post.id,
                key:'post'
              })
              setShowEditComments(true)
            })}
            onClickDelete={(async()=>{
              console.log("osijdio")
             // await deleteComment(40)
             })}
          />
          </div>
        }

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
        {commentList.length > 0 && commentList.map((item) => (
          <div key={`${item.id}-${value. keyComments}`}>
            <Comments
               content={item}
              style={{
                marginTop: '10px',
                maxWidth: '650px',
              }}
              onClickDelete={(async()=>{
               await deleteComment(item.id)
              })}
              isCreator={item.isCreator}
              onClickEdit={(()=>{
                setValue({
                  ...value,
                  content:item.content,
                  commentsId:item.id,
                  keyComments:'comments'
                })
                setShowEditComments(true)
              })}
              onClick={(()=>{
              console.log(item.postId)
              router.push(`/toTalk/feed/comments/comment/${item.id}`)
              })}
            />
          </div>
        ))}
      </Scroll>
    </main>
  );
}
