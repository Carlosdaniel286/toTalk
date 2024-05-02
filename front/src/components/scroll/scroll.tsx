'use client'
import {  CSSProperties, ReactNode } from "react"
import styles from './style/scroll.module.css'
import { FloatingActionButtons } from "./components/floatingActionButton/floatingActionButton"
import { P } from "../p/p"
type propsScroll ={
    children:ReactNode[]|ReactNode,
    style?:CSSProperties,
    id?:string,
    renderFloating?:boolean
}

export const Scroll =({children,style,id,renderFloating}:propsScroll)=>{
    const isrenderFloating = renderFloating? renderFloating:false
    
  return(
    <div className={styles.body}>
      <div className={styles.scroll}
       style={style}
       id={id}
      >
             <div >
                {children}
            </div> 
          <div className={styles.last}>
           <P
           style={{
            fontSize:"50px"
           }}
           >{''}</P>
        </div>
        {isrenderFloating &&
        <div className={styles.floatingActionButtons} >
          <FloatingActionButtons/>
        </div>
       }
      </div>
    
    </div>
    )
}