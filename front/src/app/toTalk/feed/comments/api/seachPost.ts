import axios from "axios"
import { urlServer } from "@/@variables/env"
import { posts } from "@/@types/post"

export const apiSearchPost= async(id:string):Promise<posts>=>{
  try{
    const response = await axios.get<posts>(`${urlServer}/uniquePost/${id}`,{
      withCredentials:true
    });
    return response.data;
  }catch(error){
    console.log(error)
    throw new Error('sem posts')
  }
}