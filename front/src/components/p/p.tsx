import style from './style/p.module.css'
import { CSSProperties, ReactNode } from 'react'

type propsP={
    children:ReactNode[] | ReactNode  
    id?:string
    onClick?:(()=>void)
    style?:CSSProperties
}

export const P=({children,onClick,id,style}:propsP)=>{
    const styles:CSSProperties={
        wordBreak:'break-word',
        padding:'0px',
        margin:'0px',
        fontFamily:'myFont',
    }

    const newStyle = { ...styles, ...style };
    
    
    
    return(
    <p
    onClick={(()=>{
        if(onClick)onClick()
    })}
    style={newStyle}
      id={id}
    >
     {children}
    </p>
    )
}