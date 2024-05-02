'use client'
import { Post } from '@/components/post/post';
import style from './style/feed.module.css';
import { Scroll } from '@/components/scroll/scroll';
import {   useEffect, useState } from 'react';
import { useGetPost } from '@/contexts';
import { propsPost } from '@/@types/post';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import { useCostumResize } from '@/@hooks';
export type posts ={
  user?:string
  id?:number,
  content:string,

}
type propsFeed={
  post?:posts[],
  renderFullPost?:boolean
  comments?:propsPost[]
}




export default function Feed() {
  const router =useRouter()
  const [contente,setConent] = useState<posts[]>([{
    id:0,
    content:'',
    user:''
  }]);
  const{getPost}=useGetPost()
const gets = async()=>{
    const response = await axios.get('http://localhost:3000/api/router/carlos' ,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const res:posts[]|false = response.data
    if(!res) return
    setConent([...res])

 
  }

  useEffect(()=>{
    gets()
  },[])

  useEffect(()=>{
    console.log(getPost)
    if(!getPost) return  
      const newArry = contente
      newArry.unshift(getPost)
    setConent([...newArry])
  },[getPost])
  
  return (
    <main className={style.main}>
      <div className={style.scroll}>
        <Scroll style={{
         maxHeight:'94vh'
        }}
         renderFloating={true}
        >
        {contente.map((item,index) => (
          <div key={item.id}>
            <Post
              content={item.content}
              style={
              {
              maxWidth:'650px',
              borderBottom:index == contente.length - 1 ? '1px solid rgb(185, 180, 180,0.4)' : undefined
             }
            }
             onClick={(()=>{
               router.push(`/toTalk/feed/comments/${item.id}`)
              })}
            />
          </div>
          ))}
      </Scroll>
      </div>
    </main>
  );
}
