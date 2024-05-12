'use client'
import style from './style/createPosts.module.css'
import { useState } from "react";
import { Overlay } from '@/components/overlay/overlay';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import { CreatPost } from '@/components/createPosts/createPosts'
import { proposSiderbar } from '@/@types/propsSiderBar/proposSiderBar';
import React from 'react';
import { posts, useGetPost } from '@/contexts/getPosts';
import axios from 'axios';


export const SiderBarCreatePost = ({ onClose, onClick, visible }: proposSiderbar) => {
    const [displayCreatePost, toggleDisplayCreatePost] = useState(false);
    const isVisible = visible ?? true
    const [text, setText] = useState({
        user:'carlos',
        id:0,
        content: ''
    });
    const onClosed = onClose ?? (()=>{})
    const{handlePosts}=useGetPost()
    const gets = async()=>{
        try{
        const response = await axios.post(`/api/router/carlos`,text,{
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const res:posts = response.data
        console.log(res)
        handlePosts(res)
        
      }catch(err){
        throw(err)
      }
       }
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
                    onClick={(()=>{
                        gets()
                        toggleDisplayCreatePost(false);
                        onClosed()
                      
                    })}
                    onChange={((ev)=>{
                        const texts = ev.target.value
                        setText({...text,content:texts})
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
