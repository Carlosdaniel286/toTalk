'use client'
import { Post } from '@/components/post/post';
import style from './style/feed.module.css';
import { Scroll } from '@/components/scroll/scroll';
import {   useState } from 'react';
import { arry } from '../text';
import { useGetPost } from '@/contexts';
import { propsPost } from '@/@types/post';
import { useRouter } from 'next/navigation';
import { Comments } from '@/components/comments/comments';

type propsFeed={
  post?:propsPost[],
  renderFullPost?:boolean
  comments?:propsPost[]


}


export default function Feed({post,renderFullPost,comments}:propsFeed) {
  const router =useRouter()
  const [contente] = useState(arry);
  const{handlePosts}=useGetPost()
  const contents = post?post:contente
  const isComments = comments?comments:[]
 
  
  return (
    <main className={style.main}>
      <div className={style.scroll}>
        <Scroll maxHeight='94vh'>
        {contents.map((item, index) => (
          <div key={index}>
            <Post
              id={style.content}
              content={item.content}
              borderBottom={index === contents.length - 1 ? '1px solid rgb(185, 180, 180,0.4)' : undefined}
              renderFullPost={renderFullPost}
              onClick={(()=>{
                if(post) return
                handlePosts({
                  content:item.content,
                  renderFullPost:true
                 })
                 router.push('/toTalk/feed/comments/carlos')
              })}
            />
          </div>
          ))}
        {isComments.map((item,index)=>(
          <div key={index}
          id={style.content}
           style={{
            paddingLeft:'20px',
            boxSizing:'border-box'
           }}
           >
          <Comments
           id={style.content}
           content={item.content}
           renderFullPost={renderFullPost}
           
          />
          </div>
          ))}
           
          </Scroll>
      </div>
    </main>
  );
}
