import axios from 'axios';
import { urlServer } from '@/@variables/env';

export const apiDeletePost = async (postId:number) => {
    try {
       const response = await axios.delete(`${urlServer}/delete/post/${postId}`,{
        withCredentials:true
       })
    
       return true
    } catch (error) {
        console.log(error)
        return false
      }
  };
  