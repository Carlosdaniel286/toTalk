'use client'

import { CSSProperties, HTMLAttributes, ReactNode } from "react"
import styles from './style/scroll.module.css'
type propsScroll ={
    contents:ReactNode[],
    contentStyle:string,
    height?:string,
    maxHeight?:string,
}

export const Scroll =({contents,contentStyle,height,maxHeight}:propsScroll)=>{
   
    return(
    <div className={styles.body}>
      <div className={styles.scroll}
       style={{
        height:height? height: height,
        maxHeight:maxHeight? maxHeight:maxHeight
       }}
      >
        {contents.map((item,index)=>(
            <div  key={index}  className={contentStyle}>
              {item} 
            </div>
        ))}
      </div>
    
    </div>
    )
}