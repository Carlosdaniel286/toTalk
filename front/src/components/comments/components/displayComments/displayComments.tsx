import { Comments } from "../../comments"
import { propsPost } from "@/@types/post"
import { Post } from "@/components/post/post"
import style from './style/displayComments.module.css'
export const DisplayComments =({content,id}:propsPost)=>{
    return(
    <div className={style.Comments}>
    
    <Post
     content={content}
     id={id}
    
    />
    
    <Comments
     content={'bom dia '}
     id={id}
    />
   
    </div>
    )

}