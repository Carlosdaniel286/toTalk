'use client'
import React, { ChangeEvent, useState } from 'react';
import { Button} from '@mui/joy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { P } from '@/components/index';
import styles from './style/createPosts.module.css'
import { propsPost } from '@/@types/post';
import { SxProps } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';
import { isEmpty } from '@/functions/validations/validation';

type Comments = Omit<propsPost, 'content'> & {
  onClose?: () => void;
  buttonClose?:boolean;
  maxRows?: number;
  minRows?:number;
  value?:string ;
  sx?: SxProps;
  placeholder?:string
  onChange?:(ev:ChangeEvent<HTMLTextAreaElement>)=>void
  minHeight?:string
};

export const CreatPost = ({ onClose, style ,maxRows,onChange,buttonClose,minRows,value,onClick,placeholder}: Comments) => {
  const renderButtonClose = buttonClose !== undefined ? buttonClose : true;

const handleTextareaChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    onChange ? onChange(ev):(()=>{})
  };

  return (
     <div className={styles.CreatBody}
      style={{
       width:'100%' ,
       height:'100%',
       background:'white',
       borderRadius:'10px',
       ...style
      }}
      >
        <header className={styles.header}>
        {renderButtonClose ===false && 
        <P
           style={{
            padding:'14px',
           }}
          >@Resposta</P>
        }
       
        {renderButtonClose && 
          <>
          <div className={styles.visible}>
        <P
         onClick={onClose}
         style={{
        fontSize: '2.5rem'
        }}
      >
      X
     </P>
  </div>
  </>
}
      </header>
        <div className={styles.user}>
          <AccountCircleIcon sx={{  height: '40px', width: '40px' }} />
         </div>
        <div className={styles.write}
         style={{
         
         minHeight:'90%'
         }}
        >
          <Textarea
           minRows={minRows}
           
            sx={{
              '--Textarea-focusedThickness': 'none',
               boxShadow:'none',
               border:'0px',
               background:'none',
               
              '--Textarea-focusedHighlight': 'rgba(13,110,253,.25)',
              fontSize:'1.2rem',
              fontFamily:'myFontRegular',
              
            }}
            value={value}
            onChange={handleTextareaChange}
            placeholder={placeholder??'O que você está pensando?'}
            id={styles.textarea}
            maxRows={maxRows}
            
          />
        </div>
        <div className={styles.button}>
            <Button onClick={onClick} sx={{ borderRadius: '12px', height: '20px' }}>
              <P  
              style={{
                fontSize:'1rem',
                color:'white'
              }}
              >
                Publicar
              </P>
            </Button>
          </div>
      </div>
   
  );
};
