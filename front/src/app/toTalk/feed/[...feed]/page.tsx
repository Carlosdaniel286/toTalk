import { Post } from '@/components/post/post';
import style from './style/feed.module.css'
import { Scroll } from '@/components/scroll/scroll';


export default function Feed() {

  
return (
    <main className={style.main}>
   <div className={style.scroll} >
    <Scroll
     contentStyle={{ paddingTop:'8px',width:'400px'}}
     contents={[<Post/>,<Post/>,
     
    ]}
     maxHeight='600px'
     
  />
   </div>
   </main>
  );
}