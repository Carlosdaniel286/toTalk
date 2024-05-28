import axios from "axios";
import { urlServer } from "@/@variables/env";
export const apiCheckToken = async () => {
    try {
       const response = await axios.get(`${urlServer}/token`,{
        withCredentials:true
      })
      console.log(response)
      return true
    } catch (error) {
        console.log(error)
      return false
    }
  };
  