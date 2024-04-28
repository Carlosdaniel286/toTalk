import { CSSProperties } from "react"

export type propsPost={
    id?: string 
    style?:CSSProperties 
    onClick?:(()=>void)
    renderFullPost?:false | true
    content:string
  }