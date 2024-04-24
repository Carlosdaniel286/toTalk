'use client'
import style from './style/createPosts.module.css'
import { useState } from "react";
import { Overlay } from '@/components/overlay/overlay';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import { CreatPost } from '@/components/createPosts/createPosts'
import { proposSiderbar } from '@/@types/propsSiderBar/proposSiderBar';
import React from 'react';


export const SiderBarCreatePost = ({ onClose, onClick, visible }: proposSiderbar) => {
    const [displayCreatePost, toggleDisplayCreatePost] = useState(false);
    const isVisible = visible ?? true
    const onClosed = onClose ?? (()=>{})

    return (
        <>
            {displayCreatePost &&
                <Overlay
                    onClose={() => {
                        toggleDisplayCreatePost(false);
                        onClosed()
                    }}
                >
                    <CreatPost 
                    onClose={ (()=>{
                        toggleDisplayCreatePost(false);
                        onClosed()
                    })}
                    />
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
