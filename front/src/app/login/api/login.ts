import axios, { AxiosError} from "axios";

export const apiLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`/api/login/logs`, {
      email,
      password,
    });
    return {
      message: response.data,
      status: 200
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data;
     return {
        message,
        status:400
      };
     
    }
    return{
      message:'erro',
      status:400
    }
  }
};
