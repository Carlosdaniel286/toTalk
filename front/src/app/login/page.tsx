import { urlServer } from "@/@variables/env";
import { LoginForm } from "./login"
import axios, { AxiosError} from "axios";
import { v4 as uuidv4 } from 'uuid';
import { redirect } from "next/navigation";

async function getProjects() {
  try {
     await axios.get(`${urlServer}/token`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    return 200;
  } catch (error) {
    console.error("Erro ao obter projetos:", error);
    return 400;
  }
}

export default async function Login() {
  const status = await getProjects();
  const idTemporary = uuidv4();
  if (status === 200) {
    return redirect(`/toTalk/feed/${idTemporary}`);
  }
return (
    <LoginForm/>
  );
}