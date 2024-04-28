'use client'
import styles from './style/createPosts.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Textarea from '@mui/joy/Textarea';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '@mui/joy';
import {P} from '@/components/index'
import { proposSiderbar } from '@/@types/propsSiderBar/proposSiderBar';
import React from 'react';
import axios from 'axios';
import { useGetPost } from '@/contexts';
import { useCostumResize } from '@/@hooks';
import { posts } from '@/app/toTalk/feed/[feed]/page';
type propsCreatePost = Omit<proposSiderbar,'onClick'|'visible'>;
import { propsPost } from '@/@types/post';

type comments = Omit<propsPost, 'content'> & {
  onClose?: () => void;
  maxRows?:number
};

export const CreatPost = ({onClose,style,id}:comments) => {
 const[textarea, setTextarea]=useState('')
 const[ fontSize, setFontSize]=useState('1.3rem')   
 const {dimensions}=useCostumResize()
 const {handlePosts}=useGetPost()
  useEffect(() => {
     console.log(dimensions.width)
  }, [dimensions.width]);
 
 const maxRows = dimensions.width >= 500 ? 30 : 11;

 

  const gets = async()=>{
    if(textarea.trim()=='') return
    const response = await axios.post('http://localhost:3000/api/router/carlos', {content:textarea}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const res:posts = response.data
    console.log(res)
     handlePosts(res)
  
  }
 





const controlTextArea =(ev: ChangeEvent<HTMLTextAreaElement>)=>{
   const text = ev.target.value
   const isWidth = dimensions.width <= 500
   if(text.length>800) return
   if(text.length==200) setFontSize('1.1rem')
   if(text.length==300 && !isWidth) {
    setFontSize('1rem')
  }
   setTextarea(text)
}
 return (
     <div className={styles.container}>
        <div className={styles.CreatBody}
        style={style}
        >
          <header className={styles.header}>
          <div className={styles.visible}>
              <P
               fontSize='2.5rem'
               onClick={(()=>{
                if(onClose)onClose()
               })}
               >
                X
              </P>
            </div>
          <div className={styles.button}>
         <Button
          onClick={(()=>{
            gets() 
            if(onClose)onClose()
          })}
          sx={{
          borderRadius:'12px',
          height:"20px"
          }}
         >
        <P 
        fontSize='1rem'
        color='white'
        
        >
          Publicar
        </P>
         </Button>
        </div>
           
          </header>
           <div className={styles.user} >
           <AccountCircleIcon
            sx={{paddingRight:'10px',height:'40px',width:'40px'}}
            />
            <P>carlos289</P>
           </div>
           <div className={styles.write} >
           <Textarea
           value={textarea}
            onChange={((ev)=>controlTextArea(ev))}
            sx={{
            border:'none', 
            resize: 'none',
            background:'none',
            borderRadius:'none',
            '--Textarea-focusedThickness': 'none',
            '&:focus-within': {
               color:'rgb(18, 18, 19,0.9)',
               "::placeholder":''
              },
             fontFamily:'myFontRegular',
             fontSize,
             minHeight:'320px',
             margin:'0px',
              outline: 0
           }}
             color="neutral"
             disabled={false}
             placeholder={'O que você estar pensando?'}
             size="sm"
             variant="outlined"
             id={styles.textarea}
             maxRows={maxRows}
             
          />
        </div>
        
        </div>
      </div>
 );
};
