import style from './style/creatPosts.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Textarea from '@mui/joy/Textarea';
import { ChangeEvent, useState } from 'react';
import { Button } from '@mui/joy';
import {P,BoxGrid} from '@/components/index'
import { proposSiderbar } from '@/@types/propsSiderBar/proposSiderBar';
import React from 'react';
type propsCreatePost = Omit<proposSiderbar,'onClick'|'visible'>;




export const CreatPost = ({onClose}:propsCreatePost) => {
 
 const[textarea, setTextarea]=useState('')
 const[ fontSize, setFontSize]=useState('1.3rem')   

 const controlTextArea =(ev: ChangeEvent<HTMLTextAreaElement>)=>{
   const text = ev.target.value
   if(text.length>800) return
   if(text.length==200) setFontSize('1.1rem')
   if(text.length==300) setFontSize('1rem')
   setTextarea(text)
}
    
    
  return (
        <div className={style.CreatBody}>
          <header className={style.header}>
            <h2 className={style.h2} >Criar publicação</h2>
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
            border:'0px', 
            '--Textarea-focusedThickness': '0rem',
            '&:focus-within': {
               color:'rgb(18, 18, 19,0.9)',
               "::placeholder":''
              },
             fontFamily:'myFontRegular',
             fontSize,
             minHeight:'200px',
             margin:'0px',
             padding:'0px'
           }}
             color="neutral"
             disabled={false}
             placeholder={'O que você estar pensando?'}
             size="sm"
             variant="outlined"
             
             id={style.textarea}
             
             maxRows={11}
          />
        </div>
        <BoxGrid>
         <Button
          sx={{
            width:'100%',
            marginBottom:'22px'
          }}
         >
        <P 
        fontSize='1.3rem'
        color='white'
        
        >
          Publicar
        </P>
         </Button>
        </BoxGrid>
        </div>
       
    );
};
