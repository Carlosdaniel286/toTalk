import axios from "axios"
import { urlServer } from "../../../../../@variables/env"

export const apiDeleteComments= async(id:number):Promise<string | null>=>{
  try{
    await axios.delete(`${urlServer}/comment/deleteComments/${id}`,{
      withCredentials:true
    });
    return 'sucesso';
  }catch(error){
    console.log(error)
    return null
  }
}