'use client'
import style from './style/layout.module.css'
import { Sidebar } from '@/components/sidebar/sidebar';
import { GetPostProvider } from '@/contexts';
import { ReactNode } from 'react';


export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    
    <>
     <div className={style.side} >
       <div className={style.containerSideBar}>
        <Sidebar/>
        </div>
        <GetPostProvider>
          {children}
       </GetPostProvider>
    </div>
   
    </>
 
  )
}
