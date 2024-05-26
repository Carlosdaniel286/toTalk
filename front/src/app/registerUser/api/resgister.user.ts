import axios, { AxiosError } from "axios";
import { urlServer } from "@/@variables/env";

export const apiCreateUser = async (name:string,password:string,email:string) => {
    try {
      console.log(urlServer)
      const response = await axios.post(`${urlServer}/createUser`,{
        name,
        password,
        email,
      });
      console.log(response.data)
      return response.data
      } catch (error) {
      if(error instanceof AxiosError){
        const status = error.response?.data['statusCode']
        const message:string|string[] = error.response?.data['message']
        console.log(message[0])
      }
      
      
    }
  };