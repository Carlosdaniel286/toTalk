'use client'
import style from './style/createPosts.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Textarea from '@mui/joy/Textarea';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '@mui/joy';
import {P} from '@/components/index'
import { proposSiderbar } from '@/@types/propsSiderBar/proposSiderBar';
import React from 'react';
type propsCreatePost = Omit<proposSiderbar,'onClick'|'visible'>;

export const CreatPost = ({onClose}:propsCreatePost) => {
 const[textarea, setTextarea]=useState('')
 const[ fontSize, setFontSize]=useState('1.3rem')   
 const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
 
  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
     console.log(width)
  }, [width]);
 
 
const maxRows = width >= 500 ? 30 : 11;
const minHeight = width >= 500 ? '200px' : '400px';
 
 
const controlTextArea =(ev: ChangeEvent<HTMLTextAreaElement>)=>{
   const text = ev.target.value
   const isWidth = width <= 500
   if(text.length>800) return
   if(text.length==200) setFontSize('1.1rem')
   if(text.length==300 && !isWidth) {
    setFontSize('1rem')
  }
   setTextarea(text)
}
 return (
     <div className={style.container}>
        <div className={style.CreatBody}>
          <header className={style.header}>
          <div className={style.visible}>
              <P
               fontSize='2.5rem'
               onClick={(()=>{
                if(onClose)onClose()
               })}
               >
                X
              </P>
            </div>
          <div className={style.button}>
         <Button
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
           <div className={style.user} >
           <AccountCircleIcon
            sx={{paddingRight:'10px',height:'40px',width:'40px'}}
            />
            <P>carlos289</P>
           </div>
           <div className={style.write} >
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
             id={style.textarea}
             maxRows={maxRows}
             
          />
        </div>
        
        </div>
      </div>
 );
};
