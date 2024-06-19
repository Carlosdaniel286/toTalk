'use client'
import { Scroll } from '@/components/scroll/scroll';
import { Post } from '@/components/post/post';
import style from '../styles/comments.module.css'
import { CreatPost } from '@/components/createPosts/createPosts';
import { Comments } from '@/components/comments/comments';
import { useCustomComments } from '../hooks/comments';
import { CreateComments } from '../components/createComments';
import { useRouter } from 'next/navigation';

export default function RenderComments() {
  
  const{
    post,
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
     <Scroll 
        style={{
          maxHeight: '93vh',
        }}
        renderFloating={false}
        lastSpace={false}
      >
        
       {post && 
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
          />
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
            isCreator={true}
          />
        </div>
        {commentList.length > 0 && commentList.map((item) => (
          <div key={item.id}>
            <Comments
              id=''
              content={item}
              style={{
                marginTop: '10px',
                maxWidth: '650px',
              }}
              onClickDelete={(async()=>{
               await deleteComment(item.id)
              })}
              isCreator={item.isCreator}
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