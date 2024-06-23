import axios from 'axios';
import { urlServer } from '@/@variables/env';

export const apiEditPost = async (postId:number,value:string) => {
    try {
        await axios.put(`${urlServer}/Edit/post/${postId}`,{
           value,
          },{
        withCredentials:true
       })
    
       return true
    } catch (error) {
        console.log(error)
        return false
      }
  };
  