'use client'
import {  ReactNode } from "react"
import styles from './style/scroll.module.css'
import { FloatingActionButtons } from "./components/floatingActionButton/floatingActionButton"
import { P } from "../p/p"
type propsScroll ={
    children:ReactNode[]|ReactNode,
    height?:string,
    maxHeight?:string,
}

export const Scroll =({children,height,maxHeight}:propsScroll)=>{
   
    return(
    <div className={styles.body}>
      <div className={styles.scroll}
       style={{
        height:height? height: "100%",
        maxHeight:maxHeight? maxHeight:"100%"
       }}
      >
              <div >
                {children}
              </div> 
          <div className={styles.last}>
           <P
           fontSize="50px"
           >{""}</P>
        </div>
        <div className={styles.floatingActionButtons} >
          <FloatingActionButtons/>
        </div>
      </div>
    
    </div>
    )
}