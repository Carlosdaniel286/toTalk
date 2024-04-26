import { CSSProperties } from "react"

export type propsPost={
    height?:string
    content:string
    borderBottom?:string
    id?: string 
    style?:CSSProperties 
    onClick?:(()=>void)
    renderFullPost?:false | true
  }