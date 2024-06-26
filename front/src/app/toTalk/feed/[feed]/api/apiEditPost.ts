import axios from 'axios';
import { urlServer } from '@/@variables/env';
import { posts } from '@/@types/post';
export const apiEditPost = async (postId:number,content:string) => {
 
    try {
      const reponse = await axios.put<posts>(`${urlServer}/edite/post/${postId}`,{
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
  