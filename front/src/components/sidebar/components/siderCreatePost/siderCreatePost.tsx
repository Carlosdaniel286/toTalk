'use client';

import style from './style/createPosts.module.css';
import React, { useState, useCallback } from 'react';
import { Overlay } from '@/components/overlay/overlay';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import { CreatPost } from '@/components/createPosts/createPosts';
import { proposSiderbar } from '@/@types/proposSiderBar';
import { apiCreatePost } from '../../api/apiUpdatePost';
import { useUpdatePost } from '@/contexts';
import { useMediaQuery } from 'react-responsive';
export const SiderBarCreatePost = ({ onClose, onClick, visible }: proposSiderbar) => {
  const { UpdatePosts } = useUpdatePost();
  const [displayCreatePost, setDisplayCreatePost] = useState(false);
  const [content, setContent] = useState('');
  const isVisible = visible ?? true;

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const onClosed = onClose ?? (() => {});

  const handleToggleDisplayCreatePost = useCallback(() => {
    setDisplayCreatePost((prev) => !prev);
  }, []);

  const handleCreatePost = useCallback(async () => {
    const res = await apiCreatePost({ content });
    console.log(res);
    handleToggleDisplayCreatePost();
    onClosed();
    setContent('');
    if (res !== null) {
      UpdatePosts(res);
    }
  }, [content, UpdatePosts, handleToggleDisplayCreatePost, onClosed]);
  const handleChangeContent = useCallback((ev:React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(ev.target.value);
  }, []);

  return (
    <>
      {displayCreatePost && (
        <Overlay
         background={isTabletOrMobile ? 'white' : undefined}
       
          onClose={() => {
            handleToggleDisplayCreatePost();
            onClosed();
          }}
        >
          <div
            className={style.createPosts}
            style={{
             width:isTabletOrMobile? '92%':'100%',
              display: 'flex',
              alignItems: 'center',
              maxWidth: '650px',
              minHeight: '300px',
              borderBottom:'1.5px solid rgb(185, 180, 180,0.4)',
              
            }}
          >
            <CreatPost
            
              style={{ borderRadius: '10px' }}
              onClose={() => {
                handleToggleDisplayCreatePost();
                onClosed();
              }}
              maxRows={15}
              onClick={handleCreatePost}
              onChange={handleChangeContent}
              
            />
          </div>
        </Overlay>
      )}
      {isVisible && (
        <li
       
          className={style.li}
          onClick={() => {
            handleToggleDisplayCreatePost();
            if (onClick) onClick();
          }}
        >
          <div className={style.iconContainer}>
            <PostAddRoundedIcon style={{ width: '40px', height: '40px' }} />
          </div>
          <span>Criar Publicação</span>
        </li>
      )}
    </>
  );
};
