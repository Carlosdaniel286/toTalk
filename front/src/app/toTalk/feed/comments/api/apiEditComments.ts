import axios from 'axios';
import { urlServer } from '@/@variables/env';
import { posts } from '@/@types/post';
import { isEmpty } from '@/functions/validations/validation';
///edite/comments/:commentsId
export const apiEditComments = async (commentsId:number,content:string) => {
 
    try {
      const empty = isEmpty(content)
     if(empty.error) return
      const reponse = await axios.put<posts>(`${urlServer}/edite/comments/${commentsId}`,{
          content,
         },{
        withCredentials:true
       })
       return reponse.data
    } catch (error) {
        console.log(error)
        return false
      }
  };
  