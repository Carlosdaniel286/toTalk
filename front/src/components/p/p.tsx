import style from './style/p.module.css'
import { ReactNode } from 'react'

type propsP={
    children:ReactNode[] | ReactNode  
    margin?: string,
    padding?: string,
    fontSize?:string,
    fontFamily?:string,
    color?:string
    id?:string
    onClick?:(()=>void)
}

export const P=({children,margin,padding,fontSize,fontFamily,id,color,onClick}:propsP)=>{
    return(
    <p
    onClick={(()=>{
        if(onClick)onClick()
    })}
    style={{
        margin:margin?margin:'0%',
        padding:padding?padding: '0%',
        fontSize:fontSize?fontSize:' 0.9rem',
        fontFamily:fontFamily?fontFamily:'myFont',
        color:color?color:"black",
        wordBreak:'break-word',
       
    }}
      id={id}
    >
     {children}
    </p>
    )
}