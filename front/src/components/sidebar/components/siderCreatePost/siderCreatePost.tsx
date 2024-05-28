'use client'
import style from './style/createPosts.module.css'
import { useState } from "react";
import { Overlay } from '@/components/overlay/overlay';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import { CreatPost } from '@/components/createPosts/createPosts'
import { proposSiderbar } from '@/@types/proposSiderBar';
import { apiCreatePost } from '../../api/apiUpdatePost';
import { useUpdatePost } from '@/contexts';
import React from 'react';

export const SiderBarCreatePost = ({ onClose, onClick, visible }: proposSiderbar) => {
    const{UpdatePosts}=useUpdatePost()
    const [displayCreatePost, toggleDisplayCreatePost] = useState(false);
    const isVisible = visible ?? true
    const onClosed = onClose ?? (()=>{})
    const [content, setConent] = useState('');
   
     
    return (
        <>
            {displayCreatePost &&
                <Overlay
                    onClose={() => {
                        toggleDisplayCreatePost(false);
                         onClosed()
                    }}
                >
                   
                    <div
                     className={style.createPosts}
                     style={{
                        width:'100%',
                        display:'flex',
                        alignItems:'center',
                        maxWidth:'650px',
                        minHeight:'300px' ,
                       
                     }}
                    
                    >
                    <CreatPost 
                    style={{
                        borderRadius:'10px',
                      
                       
                    }}
                    
                    onClose={ (()=>{
                        toggleDisplayCreatePost(false);
                         onClosed()
                    })}
                    maxRows={15}
                    onClick={(async()=>{
                       const res = await apiCreatePost({content})
                       UpdatePosts(res)
                        toggleDisplayCreatePost(false);
                        onClosed()
                      
                    })}
                    onChange={((ev)=>{
                        const texts = ev.target.value
                        setConent(texts)
                    })}
                    />
                    </div>
                   
                </Overlay>
            }
            {isVisible &&
                <li
                    className={style.li}
                    onClick={() => {
                        toggleDisplayCreatePost(true);
                        if (onClick) onClick();
                    }}
                >
                    <div className={style.iconContainer}>
                        <PostAddRoundedIcon
                            style={{
                                width: "40px",
                                height: '40px',
                            }}
                        />
                    </div>
                    <span>POSTAR</span>
                </li>
            }
        </>
    );
};
