'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Textarea } from '@mui/joy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { P } from '@/components/index';
import { posts } from '@/app/toTalk/feed/[feed]/page';
import { propsPost } from '@/@types/post';
import {  useGetPost } from '@/contexts';
import styles from './style/createPosts.module.css';

type Comments = Omit<propsPost, 'content'> & {
  onClose?: () => void;
  maxRows?: number;
};

export const CreatPost = ({ onClose, style ,maxRows}: Comments) => {
  // State para controlar o texto do textarea
  const [textarea, setTextarea] = useState('');
  // State para controlar o tamanho da fonte no textarea
  const [fontSize, setFontSize] = useState('1.3rem');
  // Hook para obter as dimensões da janela
 // const { dimensions } = useCostumResize();
  // Hook para acessar e modificar os posts
  const { handlePosts } = useGetPost();
  const isClose = onClose?onClose:(()=>{})
  
 useEffect(()=>{
 console.log(textarea)
 },[textarea])
 
 
 
  const handleSubmit = async () => {
    if (textarea.trim() === '') return;
    const response = await axios.post('http://localhost:3000/api/router/carlos', { content: textarea }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const res: posts = response.data;
     handlePosts(res);
     isClose()
  };

  // Função para controlar o texto do textarea
  const handleTextareaChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const text = ev.target.value;
    ///const isWidth = dimensions.width <= 500;
    if (text.length > 800) return;
    if (text.length === 200) setFontSize('1.1rem');
    if (text.length === 300 ) {
      setFontSize('1rem');
    }
    setTextarea(text);
  };

  return (
    <div className={styles.container}>
      <div className={styles.CreatBody}
       style={style}
      >
        <header className={styles.header}>
          <div className={styles.visible}>
            <P onClick={onClose}
             style={{
              fontSize:'2.5rem'
             }}
            >
              X
            </P>
          </div>
          <div className={styles.button}>
            <Button onClick={handleSubmit} sx={{ borderRadius: '12px', height: '20px' }}>
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
        </header>
        <div className={styles.user}>
          <AccountCircleIcon sx={{ paddingRight: '10px', height: '40px', width: '40px' }} />
          <P>carlos289</P>
        </div>
        <div className={styles.write}>
          <Textarea
            value={textarea}
            onChange={handleTextareaChange}
            sx={{
              border: 'none',
              resize: 'vertical',
              background: 'none',
              borderRadius: 'none',
              '--Textarea-focusedThickness': 'none',
              '&:focus-within': { color: 'rgb(18, 18, 19,0.9)', '::placeholder': '' },
              fontFamily: 'myFontRegular',
              fontSize,
              minHeight: '200px',
              margin: '0px',
              outline: 0
            }}
            color='neutral'
            disabled={false}
            placeholder={'O que você está pensando?'}
            size='sm'
            variant='outlined'
            id={styles.textarea}
            maxRows={maxRows}
          />
        </div>
      </div>
    </div>
  );
};
