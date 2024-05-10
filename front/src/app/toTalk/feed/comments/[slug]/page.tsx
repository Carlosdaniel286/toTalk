'use client'
import { posts } from '../../[feed]/page';
import { Scroll } from '@/components/scroll/scroll';
import { Post } from '@/components/post/post';
import { useParams } from 'next/navigation';
import style from './styles/comments.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CreatPost } from '@/components/createPosts/createPosts';
import { Comments } from '@/components/comments/comments';
type comments ={
  user:string
  id:number,
  content:string,
  idPosts:number,

}



export default function RenderComments(){
const params = useParams()
const id = params.slug as string
const[posts, setPosts]=useState<posts>({
  user:'',
  content:'',
  id:0,
})
const [ text , setText]=useState('')
const[comments, setComments]=useState<comments[]>([])




const gets = async()=>{
  try{
  const response = await axios.get(`/api/comments/${id}` ,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const res:posts = response.data
  console.log(res)
  setPosts({...posts,...res})
  
}catch(err){
  throw(err)
}
 }

 const getscomments = async()=>{
  try{
    
  const response = await axios.get(`/api/gcomments/${id}` ,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const res:comments[] = response.data
  
 setComments([...res])

}catch(err){
  throw(err)
}
 }
 
 
useEffect(()=>{
 gets()
getscomments()
},[])

const handleSubmit = async () => {
  try{
    setText('')
  if (text.trim() === '') return;

  const object ={
    user:'carlos',
    content:text,
    idPosts:id,
  }
  const response = await axios.post('/api/comments/carlos', object, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('sucesso')
  const res:comments[] = response.data
  
  setComments([...res])
}catch(erro){
 console.log(erro)
}
};


 return(
    <main className={style.main}>
    <Scroll 
     style={{
       maxHeight:'94vh',
       }}
     renderFloating={false}
    >
      
    {posts.content!=='' &&
    <Post
     style={{
      borderBottom:'1px solid rgb(185, 180, 180,0.4)',
      width:`100%`,
      maxWidth:'650px'
     }}
      content={posts.content}
      renderFullPost={true}
     />
    }
     <div className={style.chat}>
       <CreatPost
        style={{
          border:'1px solid rgb(185, 180, 180,0.4)',
         borderRadius:'none',
         //border: '1px solid rgba(0, 0, 255, 0.6)',
          marginTop:'10px',
          fontSize:'1.2rem'
         }}
          maxRows={11}
          buttonClose={false}
          value={text}
          onChange={((ev)=>{
            setText(ev.target.value)
          })}
          placeholder='Postar sua Resposta'
          onClick={handleSubmit}
       />
        
        </div>
{comments.map((item)=>(
    <div key={item.id}>
       <Comments
        content={item.content}
        style={{
          marginTop:'10px'
        }}
       />


    </div>
  ))}
</Scroll>
  
  
    </main>
    
)
}