'use client'
import { Scroll } from '@/components/scroll/scroll';
import { Post } from '@/components/post/post';
import style from './styles/comments.module.css'
import { CreatPost } from '@/components/createPosts/createPosts';
import { Comments } from '@/components/comments/comments';

import { useCostumComments } from '../hooks/comments';
export default function RenderComments() {
  const{post,commentList,contentComments,setContentComments,apiCreateComment}=useCostumComments()
 return (
    <main className={style.main}>
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
            renderFullPost={true}
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
            />
          </div>
        ))}
      </Scroll>
    </main>
  );
}
