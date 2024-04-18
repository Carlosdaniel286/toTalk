'use client'
import style from './style/post.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from 'react';

type propsPost={
  height?:string
  content:string
 
}

export function Post({height,content}:propsPost){
  const [dataAtual, setDataAtual] = useState("");
  useEffect(()=>{
  setDataAtual(dataAtual.toLocaleString())
  },[])
 
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
      <p>{content}</p>
     </div>
     <div className={style.legend}>
       <p>vamos curtir okjdkjhfjk fbfhdgfegdehjehfjdhf ednejhdewf jhdjwehdjewej</p>
     </div>
     <div className={style.moment}>
      <p>{dataAtual}</p>
     </div>
     <div className={style.info}>
       <p>likes {" 0 "}</p>
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