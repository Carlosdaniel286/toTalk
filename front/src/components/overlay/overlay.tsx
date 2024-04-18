'use client'
import { ReactNode } from 'react';
import  style from './style/overlay.module.css'
type propsOverlay ={
    children:ReactNode
    onClose:(()=>void)
}

export const Overlay = ({ children ,onClose }:propsOverlay) => {
    const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
       if (event.target === event.currentTarget) {
            onClose(); 
        }
    };
    return (
        <div className={style.bodyOverLay}
        onClick={handleClickOverlay}
        >
        <>
            {children}
        </> 
      </div>
    );
};


