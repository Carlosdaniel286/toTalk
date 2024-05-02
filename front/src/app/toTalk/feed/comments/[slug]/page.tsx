'use client'
import { posts } from '../../[feed]/page';
import { Scroll } from '@/components/scroll/scroll';
import { Post } from '@/components/post/post';
import { useParams } from 'next/navigation';
import style from './styles/comments.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chat } from '@/components/chat/chat';
import { scroller } from 'react-scroll';

export default function RenderComments(){
const params = useParams()
const id = params.slug as string
const[posts, setPosts]=useState<posts[]>([])

const gets = async()=>{
  const response = await axios.get(`http://localhost:3000/api/comments/${id}` ,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const res:posts[] = response.data
  setPosts([...res])
  console.log(res)
 }

useEffect(()=>{
 gets()
},[])




 return(
    <main className={style.main}>
    <Scroll 
     style={{
       maxHeight:'94vh',
       minHeight:'70vh'
     }}
     renderFloating={false}
    >
    {posts.map((item)=>(
      <div key={item.id}>
     <Post
     style={{
      borderBottom:'1px solid rgb(185, 180, 180,0.4)',
      width:`100%`,
      maxWidth:'650px'
     }}
    
      content={item.content}
      renderFullPost={true}
     
  />
     </div>
      ))}
     
    </Scroll>
    <div className={style.chat}><Chat/></div>
    </main>
    
)
}