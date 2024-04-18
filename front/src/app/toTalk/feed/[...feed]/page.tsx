'use client'
import { Post } from '@/components/post/post';
import style from './style/feed.module.css'
import { Scroll } from '@/components/scroll/scroll';
import { Overlay } from '@/components/overlay/overlay';
import { CreatPost } from '@/components/creatPosts/creatPosts';

export default function Feed() {

  
return (
    <main className={style.main}>
      <Overlay 
        onClose={(()=>{})}
       >
        <> 
        <CreatPost/>
        </>
      </Overlay>
   <div className={style.scroll} >
    <Scroll
     contentStyle={style.contentStyle}
     contents={[<Post
      height='400px'
      content='djhjewhdeh wqediefjef wedjwedfjowedjiweo'
     />,<Post
       height='400px'
       content=''
     />,
     
    ]}
     maxHeight='600px'
     
  />
   </div>
   </main>
  );
}