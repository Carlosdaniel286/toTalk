'use client'

import { CSSProperties, HTMLAttributes, ReactNode } from "react"
import styles from './style/scroll.module.css'
type propsScroll ={
    children:ReactNode[],
    contentStyle?:string,
    height?:string,
    maxHeight?:string,
}

export const Scroll =({children,contentStyle,height,maxHeight}:propsScroll)=>{
   
    return(
    <div className={styles.body}>
      <div className={styles.scroll}
       style={{
        height:height? height: "100%",
        maxHeight:maxHeight? maxHeight:"100%"
       }}
      >
        {children.map((item,index)=>(
           
              <div key={index} className={contentStyle}>
                {item}
              </div> 
           
        ))}
      </div>
    
    </div>
    )
}