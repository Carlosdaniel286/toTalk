'use client'
//import { posts } from '../../[feed]/page';
import { Scroll } from '@/components/scroll/scroll';
import { Post } from '@/components/post/post';
import { useParams } from 'next/navigation';
import style from './styles/comments.module.css'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { CreatPost } from '@/components/createPosts/createPosts';
import { Comments } from '@/components/comments/comments';

import { posts } from '@/@types/post';
type comments ={
  user:string
  id:string,
  content:string,
  idPosts:number,
  date:Date,

}



export default function RenderComments(){
const params = useParams()
const id = params.slug as string
const[posts, setPosts]=useState<posts>()
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
  console.log("post unico")
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
  const res:comments = response.data; // Supondo que response.data contenha os dados do novo comentário
 console.log(res)
// Adicionando o novo comentário à lista de comentários existente
const updatedComments = [...comments]; // Copiando os comentários existentes para evitar mutações diretas
updatedComments.unshift(res); // Adicionando o novo comentário na primeira posição da lista

// Atualizando o estado com a nova lista de comentários
setComments(updatedComments);
}catch(erro){
 console.log(erro)
}
};

 
return(
    <main className={style.main}>
    <Scroll 
     style={{
       maxHeight:'93vh',
       }}
     renderFloating={false}
     lastSpace={false}
    >
      
    {posts !==undefined && 
    <Post
     style={{
      borderBottom:'1px solid rgb(185, 180, 180,0.4)',
      width:`100%`,
      maxWidth:'650px'
     }}
      content={posts}
      renderFullPost={true}
     />
    }
     <div className={style.chat}>
       <CreatPost
        style={{
          border:'1px solid rgb(185, 180, 180,0.4)',
         borderRadius:'none',
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
   
   {comments.length>0 && comments.map((item)=>(
    /*
    <div key={item.id}>
       <Comments
       content={item}
         style={{
          marginTop:'10px',
          maxWidth:"650px",
         
        }}
       />
       </div>

       */
      <></>
  ))}
</Scroll>

  
    </main>
    
)
}