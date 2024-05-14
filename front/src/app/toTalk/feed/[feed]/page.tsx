'use client'
import { Post } from '@/components/post/post';
import style from './style/feed.module.css';
import { Scroll } from '@/components/scroll/scroll';
import {   useEffect, useState } from 'react';
import { useGetPost } from '@/contexts';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { initPosts } from '@/constants';
import { posts } from '@/@types/post';






export default function Feed() {
  const router =useRouter()
  const [contente,setConent] = useState<posts[]>([initPosts]);
  const{getPost}=useGetPost()
const gets = async()=>{
    const response = await axios.get('/api/router/carlos' ,{
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
        {  contente.map((item,index) => (
          
          <div key={item.id}>
            {item.id!=='' && 
            <Post
              content={item}
              style={
              {
              maxWidth:'650px',
              borderBottom:index == contente.length - 1 ? '1px solid rgb(185, 180, 180,0.4)' : undefined
             }
            }
             onClick={(()=>{
              console.log(item.id)
               router.push(`/toTalk/feed/comments/${item.id}`)
              })}
            />
}
          </div>
          ))}
      </Scroll>
      </div>
    </main>
  );
}
