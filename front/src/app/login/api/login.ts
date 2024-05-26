import axios, { AxiosError} from "axios";

export const apiLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`/api/login/logs`, {
      email,
      password,
    });
    return {
      message: response.data,
      status: response.status
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = error.response?.data;
      console.log(status);
      console.log(message);
      return {
        message,
        status
      };
    } else {
      return {
        error,
        status: 400
      };
    }
  }
};
