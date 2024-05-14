import { CSSProperties } from "react"

export interface propsPost {
  content: posts;
  id?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  renderFullPost?: boolean;
  typePost?:'post'|'comments'
}

  export type posts ={
    user:string
    id:string,
    content:string,
    date:Date

  
  }