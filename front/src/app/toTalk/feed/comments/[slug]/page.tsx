'use client'
import { posts } from '../../[feed]/page';
import { Scroll } from '@/components/scroll/scroll';
import { Post } from '@/components/post/post';
import { useParams } from 'next/navigation';
import style from './styles/comments.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCostumResize } from '@/@hooks';
import { CreatPost } from '@/components/createPosts/createPosts';


export default function RenderComments(){
const params = useParams()
const id = params.slug as string
const {elementRef,refDimensions}=useCostumResize()
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

useEffect(()=>{
  console.log(refDimensions.width)
 },[refDimensions.width])


 return(
    <main className={style.main}
     ref={elementRef}
    >
    <Scroll  maxHeight='94vh'>
    {posts.map((item)=>(
      <div key={item.id}>
     <Post
     style={{
      borderBottom:'1px solid rgb(185, 180, 180,0.4)',
      width:`${refDimensions.width-2}px`,
      maxWidth:'650px'
     }}
    
      content={item.content}
      renderFullPost={true}
     
  />
     </div>
      ))}
    </Scroll>
     
    </main>
    
)
}