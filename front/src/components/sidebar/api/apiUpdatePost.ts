
import { newPost,posts} from '@/@types/post';
import axios from 'axios';
import { urlServer } from '@/@variables/env';

export const apiCreatePost = async (post:newPost) => {
    try {
        if(post.content.trim()=='') throw new Error('campo vazio')
       const response = await axios.post(`${urlServer}/createPost`,post,{
        withCredentials:true
       })
      const res:posts = response.data
       return res 
    } catch (error) {
        console.log(error)
        return null
      }
  };
  