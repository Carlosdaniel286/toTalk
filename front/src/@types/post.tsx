import { CSSProperties } from "react"

export interface propsPost {
  content?: posts;
  liked?:boolean;
  countLiked?:number,
  style?: React.CSSProperties;
  onClick?: () => void;
  renderFullPost?: boolean;
  isCreator:boolean;
  countComments:number 
  typePost?:'post'|'comments',
  onClickDelete?: () => void;
  onClickEdit?: () => void;
 
 
}

export type newPost={
  content: string,
}
  


export type posts = newPost&{
    id: number,
    createdAt: string,
    published: boolean,
    author:string,
    postId?:string,
    isCreator:boolean,
    countComments:number
  }

  