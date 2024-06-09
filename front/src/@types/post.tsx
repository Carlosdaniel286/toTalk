import { CSSProperties } from "react"

export interface propsPost {
  content: posts;
  id?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  renderFullPost?: boolean;
  typePost?:'post'|'comments'
}

export type newPost={
  content: string,
}
  


export type posts = newPost&{
    id: number,
    createdAt: string,
    published: boolean,
    author:string,
    postId?:string
  }

  