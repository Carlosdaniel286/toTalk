import axios, { AxiosError } from "axios";
import { urlServer } from "@/@variables/env";

type Message ={
  message:string,
  code:number
}

export const apiCreateUser = async (name:string,password:string,email:string):Promise<Message>  => {
    try {
      const newName = name.split(' ').join('')
      const response = await axios.post(`${urlServer}/createUser`,{
        name:newName,
        password,
        email,
      });
      return {
        message:'Usuário criado com sucesso',
        code:200
      }
      } catch (error) {
      if(error instanceof AxiosError){
        const message:string|string[] = error.response?.data['message']
        
       if(typeof message=='string')  return {
        message,
        code:400
      }
        const mes = message.map((ev)=>{
         return ev
        })
        return {
          message:mes.join(' '),
          code:400
        }
      
      }
      return {
        message:'erro',
        code:400
      }
      
    }
  };