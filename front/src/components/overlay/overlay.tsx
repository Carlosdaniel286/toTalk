'use client'
import { CSSProperties, ReactNode } from 'react';
import  style from './style/overlay.module.css'
type propsOverlay ={
    children:ReactNode
    onClose?:(()=>void)
    background?:string
    styles?:CSSProperties
}

export const Overlay = ({ children ,onClose,background,styles }:propsOverlay) => {
    const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
       if (event.target === event.currentTarget) {
            onClose!==undefined? onClose():(()=>{}) 
        }
    };
    return (
        <div className={style.bodyOverLay}
         onClick={handleClickOverlay}
         style={{
            background:background?background:'rgba(0, 0, 0, 0.5)',
            ...styles
         }}
       >
        <>
            {children}
        </> 
      </div>
    );
};


