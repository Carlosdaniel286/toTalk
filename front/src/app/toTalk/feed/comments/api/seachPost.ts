import axios from "axios"
import { urlServer } from "@/@variables/env"
import { posts } from "@/@types/post"

export const apiSearchPost= async(id:string,type:string):Promise<posts | null>=>{
  try{
    const response = await axios.get<posts>(`${urlServer}/${type}/uniquePost/${id}`,{
      withCredentials:true
    });
    console.log(response.data)
    return response.data;
  }catch(error){
    console.log(error)
    return null
  }
}