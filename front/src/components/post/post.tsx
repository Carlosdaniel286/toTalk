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
  textFull:'...mais' |'...menos'
}

export function Post({height,content,borderBottom,id,style}:propsPost){
  const [dataAtual, setDataAtual] = useState("");
  const [showFullContent, setShowFullContent] = useState<contentPost>({
    content:'',
    textFull:'...mais'
  });
 const styleDone:CSSProperties ={
  height,
  content,
  borderBottom:borderBottom?borderBottom:undefined,
 }
 const newStyle = {...styleDone,...style}
  
  
 
 useEffect(()=>{
    const data = new Date()
    setDataAtual(data.toLocaleString())
    spliceText()
  },[])
 
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
    setShowFullContent({...showFullContent,content,textFull:'...menos'})
   }
   if(showFullContent.textFull=='...menos'){
    const novaString = content.slice(0, 600)
    setShowFullContent({...showFullContent,content:novaString,textFull:'...mais'})
   }
 } 
return (
   <div 
     id={id}
     className={styles.BodyPost}
     style={newStyle}
   >
    <header className={styles.header} >
      <AccountCircleIcon
       sx={{paddingRight:'10px',
        fontSize:'2.4rem'
       }}
      />
      <h4>Carlos289</h4>
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
       fontSize='1rem'
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
        toggleText()
      })}
      >{content.length<600?'': showFullContent.textFull}</P>
     </div>
     
    <div className={styles.containerReaction} > 
     <ChatBubbleOutlineIcon
      sx={{
      cursor:'pointer',
      fontSize:'1.1rem'
      }}
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