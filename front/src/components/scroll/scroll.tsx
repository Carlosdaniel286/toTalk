'use client'
import {  CSSProperties, LegacyRef, ReactNode} from "react"
import styles from './style/scroll.module.css'
import { FloatingActionButtons } from "./components/floatingActionButton/floatingActionButton"
import { P } from "../p/p"
type propsScroll ={
    children:ReactNode[]|ReactNode,
    style?:CSSProperties,
    id?:string,
    renderFloating?:boolean
    ref?:LegacyRef<HTMLDivElement>
    lastSpace?:boolean
}

export const Scroll =({children,style,id,renderFloating,ref,lastSpace}:propsScroll)=>{
    const isrenderFloating = renderFloating!==undefined? renderFloating:false
    const isLastSapce= lastSpace!==undefined?lastSpace:true
    
  return(
    <div className={styles.body}>
      <div className={styles.scroll}
       style={style}
       id={id}
       ref={ref}
       onScroll={((ev)=>{
        // console.log(ev.currentTarget.scrollTop=400)
         ev.currentTarget.removeEventListener('scroll',(()=>{
          console.log('fui')
         }))
       })}
      >
             <div >
                {children}
            </div> 
            {isLastSapce && 
          <div className={styles.last}>
           <P
           style={{
            fontSize:"50px"
           }}
           >{''}</P>
        </div>
        }
        {isrenderFloating &&
        <div className={styles.floatingActionButtons} >
          <FloatingActionButtons/>
        </div>
       }
      </div>
    
    </div>
    )
}