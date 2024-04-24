'use client'
import { ReactNode } from 'react';
import  style from './style/overlay.module.css'
type propsOverlay ={
    children:ReactNode
    onClose:(()=>void)
    background?:string
}

export const Overlay = ({ children ,onClose,background }:propsOverlay) => {
    const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
       if (event.target === event.currentTarget) {
            onClose(); 
        }
    };
    return (
        <div className={style.bodyOverLay}
         onClick={handleClickOverlay}
         style={{
            background:background?background:'rgba(0, 0, 0, 0.5)'
         }}
       >
        <>
            {children}
        </> 
      </div>
    );
};


