'use client'
import styles from './style/post.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CSSProperties, useEffect, useState } from 'react';
import {P} from '../index'
import { propsPost } from '@/@types/post';
type contentPost ={
  content:string,
  textFull:'...mais' |''
}

export function Post({content,id,style,onClick,renderFullPost}:propsPost){
  const [dataAtual, setDataAtual] = useState("");
  const [showFullContent, setShowFullContent] = useState<contentPost>({
    content:'',
    textFull:'...mais'
  });
 
 
  
  useEffect(()=>{
    const data = new Date()
    setDataAtual(data.toLocaleString())
    spliceText()
  },[])
  useEffect(()=>{
    if(renderFullPost==undefined || renderFullPost==false) return
      toggleText()
     
  },[renderFullPost])
 
  const spliceText =()=>{
   if(content.length<600) {
      setShowFullContent({...showFullContent,content})
    }else{
    const novaString = content.slice(0, 600)
    setShowFullContent({...showFullContent,content:novaString})
    }
  } 
 
const toggleText =()=>{
   if(showFullContent.textFull=='...mais'){
    setShowFullContent({...showFullContent,content,textFull:''})
   }
   
 } 
return (
   <div 
     id={id}
     className={styles.BodyPost}
     style={style}
     
     >
    <header className={styles.header}>
      <div className={styles.user}>
      <AccountCircleIcon
       sx={{paddingRight:'10px',
        fontSize:'2.4rem'
       }}
      />
      <h4>Carlos289</h4>
      </div>
      <div className={styles.moment}>
      <P
      color='rgb(68, 65, 65,0.5)'
      fontSize='0.8rem'
      >{dataAtual}</P>
      </div>
      
     </header>
     <div className={styles.contentPost}>
      <P 
      id={styles.content}
       fontSize='1.1rem'
       color='#333'
       fontFamily='myFontRegular'
       padding='0px 0px 0px 0px'
       
      >
      {showFullContent.content}
      </P>
      <P
      id={styles.more}
      color='rgb(68, 65, 65)'
      fontSize='1'
      onClick={(()=>{
       if(onClick)onClick()
      })}
      > { content.length<=600? '' :showFullContent.textFull}</P>
     </div>
     
    <div className={styles.containerReaction} > 
     <ChatBubbleOutlineIcon
      sx={{
      cursor:'pointer',
      fontSize:'1.1rem'
      }}
      onClick={(()=>{
        if(onClick)onClick()
        })}
     />
     <div className={styles.info}>
     <FavoriteBorderIcon
      sx={{
      cursor:'pointer',
      fontSize:'1.1rem'

      }}
      color='error'
    
     />
     <P
     fontSize='1rem'
     color='rgb(185, 180, 180)'
     fontFamily='myFontRegular'
     >10</P>
     </div>
     </div>
   </div>
  );
}