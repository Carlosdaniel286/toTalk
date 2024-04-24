'use client'
import { Post } from '@/components/post/post';
import style from './style/feed.module.css';
import { Scroll } from '@/components/scroll/scroll';
import {  useState } from 'react';
import { arry } from '../text';
import { DisplayComments } from '@/components/comments/components/displayComments/displayComments';

export default function Feed() {
  const [contents] = useState(arry);
  const [id,setId] = useState('');
  const [displayPosts,setDisplayPosts] = useState(true);
  
return (
    <main className={style.main}>
      <div className={style.scroll}>
        <Scroll maxHeight='94vh'>
        {contents.map((item, index) => (
            displayPosts && (
           <div key={index}
             onClick={(()=>{
               setId(item.content)
               setDisplayPosts(!displayPosts)
              })}
             >
           
            <Post
              id={style.content}
              content={item.content}
              borderBottom={index === contents.length - 1 ? '1px solid rgb(185, 180, 180,0.4)' : undefined}
            />
           </div>
          )
          ))}
          {!displayPosts&&
          <>
          <DisplayComments
            content={id}
            id={style.content}
          />
          </>
          }
        </Scroll>
      </div>
    </main>
  );
}
