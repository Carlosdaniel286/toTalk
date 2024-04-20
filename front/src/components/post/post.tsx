'use client'
import style from './style/post.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from 'react';
import {P} from '../index'

type propsPost={
  height?:string
  content:string
}

type contentPost ={
  content:string,
  textFull:'...mais' |'...menos'
}

export function Post({height,content}:propsPost){
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
   <div className={style.BodyPost}
    style={{height: height? height: height}}
   >
    <header className={style.header} >
      <AccountCircleIcon
       sx={{paddingRight:'10px'}}
      />
      <h4>Carlos289</h4>
     </header>
     <div className={style.contentPost}>
      <P 
      id={style.content}
       fontSize='1.1rem'
       color='#333'
       fontFamily='myFontRegular'
      >
        {showFullContent.content}
      </P>
      <P
      id={style.more}
      color='rgb(68, 65, 65)'
      fontSize='1'
      onClick={(()=>{
        toggleText()
      })}
      >{content.length<600?'': showFullContent.textFull}</P>
     </div>
     
     <div className={style.moment}>
      <P
      color='rgb(68, 65, 65,0.5)'
      fontSize='0.8rem'
      >{dataAtual}</P>
      
     </div>
     <div className={style.info}>
     <P>like 0</P>
     </div>
    <div className={style.containerReaction} > 
     <ChatBubbleOutlineIcon
      sx={{cursor:'pointer'}}
     />
     <FavoriteBorderIcon
     sx={{cursor:'pointer'}}
     color='error'
     />
     </div>
   </div>
  );
}